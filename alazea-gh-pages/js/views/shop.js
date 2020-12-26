// (function ($) {
    
    
    
//   })(jQuery);

  var token = '812ca916-d1f3-4e68-888c-5cb553fc4f78'
    new Vue({
      el: '.shop-page',
      data: {
        pageNo:0,
        list:[],
        total:0,
        size:10,
      },
      computed: {
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
              url: '/product/getList?token=' + token + "&pageNo=0&pageSize=10",
              method: 'POST',
              success: function (json) {
                var data  = JSON.parse(json).data
                _this.total= data.totalCount
                _this.list = data.list
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