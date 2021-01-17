var token = sessionStorage.getItem('token');
new Vue({
  el: '#portfolio',
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
        var sku = this.skus[this.curSku]
        var count = this.count
        let promises = []
        for(let i = 0 ; i < count  ; i ++) {
            this.createOrder(sku.id,sku.spuId)
        }
        console.log(promises)
        Promise.all(promises)
        .then((res) => {
            $('.modal').modal('toggle')
        })
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
            data.detail = JSON.parse(data.detail)
            data.desc = data.desc.split('\n')
            console.log(data)
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