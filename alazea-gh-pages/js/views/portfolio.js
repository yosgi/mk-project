
var token = sessionStorage.getItem('token');
  new Vue({
    el: '.alazea-portfolio-area',
    data: {
      pageNo:0,
      list:[],
      total:0,
      size:30,
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
              var data  = json.data
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