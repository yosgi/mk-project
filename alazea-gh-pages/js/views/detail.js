var token = '812ca916-d1f3-4e68-888c-5cb553fc4f78'
new Vue({
  el: '.single_product_details_area',
  data: {
    info:{},
    curSku:0,
    skus:[]
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
    page() {
      return new Array(Math.floor(this.total / this.size) + 1).fill(1)
    }
  },
  created() {
    this.fetch()
  },
  methods:{
    fetch() {
      var _this = this
      api({
          url: '/product/getDetail?token=' + token + "&spuId="+ _this.query.id,
          method: 'POST',
          success: function (json) {
            var data  = JSON.parse(json).data
            data.otherImage = JSON.parse(data.otherImage).splice(0,3)
            data.detail = JSON.parse(data.detail)
            data.desc = data.desc.split('\n')
            
            console.log(data)
            _this.skus = data.skus
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