var token = sessionStorage.getItem('token');
new Vue({
  el: '.single_product_details_area',
  data: {
    info:{},
    curSku:0,
    skus:[],
    spuAttribute:{key:[]},
    count:1
  },
  computed: {
    query() {
        function parseQueryString(url){
            var str=url.split("?")[1],
            items=str.split("&");
            var arr,name,value;
            for(var i = 0, l = items.length; i < l; i++){
                arr=items[i].split("=");
                name= arr[0];
                value= arr[1];
                this[name]=value;
            }
        }
        return  obj=new parseQueryString(window.location.href);
    },
    keyMap() {
        //商品属性名 id
        let res = {}
        this.spuAttribute.key.forEach(v => {
            res[v.id] = v.name
        })
        return res
    },
    valMap() {
        // 商品属性值
        var vals = {}
        this.spuAttribute.value.forEach(v => {
            vals[v.id] = v.name
        })
        return vals
    }
  },
  created() {
    this.fetch()
  },
  methods:{
    submit() {
        var  product = this.skus[this.curSku]
        var skuId = product.id
        var count = this.count
        var spuId = product.spuId
        var name = this.info.name
        var src = this.info.headImage
        var price = product.price
        var detail = ''
        JSON.parse(product.skuAttribute).forEach(v => {
          detail += this.valMap[v.value]
        })
        var lib = new localStorageDB("library", localStorage);
        if (! lib.tableExists('products')){
          lib.createTable("products", ["name", "src", "count", "price", "detail",'skuId','spuId']);
        }
        if (lib.query("products", {skuId}).length ){
          lib.update("products", {skuId}, function(row) {
            row.count+=count
            return row;
          });        
        } else {
          lib.insert("products", {name, src, count, price, skuId,spuId,detail})
        }
        var res = lib.commit();
        res && $('.modal').modal('toggle')
         // for(let i = 0 ; i < count  ; i ++) {
        //     this.createOrder(sku.id,sku.spuId)
        // }
        // console.log(promises)
        // Promise.all(promises)
        // .then((res) => {
        //     $('.modal').modal('toggle')
        // })
    },
    createOrder(skuId,spuId) {
        return new Promise((resolve,reject) => {
            api({
                url: `/product/order/createOrder?token=${token}&spuId=${spuId}&skuId=${skuId}&addressId=2`,
                method: 'POST',
                success: function (json) {
                    resolve()
                }
            })
        })
        
    },
    fetch() {
      var _this = this
      api({
          url: '/product/getDetail?token=' + token + "&spuId="+ _this.query.id,
          method: 'POST',
          success: function (json) {
            var data  = json.data
            data.otherImage = JSON.parse(data.otherImage).splice(0,3)
            data.detail = data.detail
            data.desc = data.desc.split('\n')
            data.tags = JSON.parse(data.tags)
            _this.skus = data.skus
            _this.spuAttribute = data.spuAttribute
            _this.info = data
          }
      })
    },
    nextPage() {
      if (this.pageNo < this.page.length - 1) {
        this.pageNo ++
        this.fetch()
      }
    }
  }    
})