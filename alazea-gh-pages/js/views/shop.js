
var token = sessionStorage.getItem('token');
    new Vue({
      el: '.shop-page',
      data: {
        pageNo:0,
        list:[],
        total:0,
        size:6,
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
              url: `/product/getList?token=${token}&pageNo=${this.pageNo}&pageSize=${this.size}`,
              method: 'POST',
              success: function (json) {
                data = json.data
                _this.total= data.totalCount
                _this.list = data.list
              }
          })
        },
        jump(page) {
          this.pageNo = page
          this.fetch()
        },
        nextPage() {
          if (this.pageNo <= this.page.length - 1) {
            this.pageNo ++
            this.fetch()
          }
        }
      }    
    })