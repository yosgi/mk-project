
var token = sessionStorage.getItem('token');
    new Vue({
      el: '.shop-page',
      data: {
        pageNo:0,
        list:[],
        total:0,
        size:10,
        curHover:-1,
        category:0,
        categoryMap:['所有','餐具','水瓶','饭兜','其它'],
      },
      computed: {
        page() {
          return new Array(Math.floor(this.total / this.size) ).fill(1)
        }
      },
      created() {
        this.fetch()
      },
      methods:{
        change(index) {
          this.category = index
          this.fetch()
        },
        hoverHandler(index,flg) {
          if (flg) {
            this.curHover = index
          } else {
            this.curHover =  -1
          }
        },
        fetch() {
          var _this = this
          api({
              url: `/product/getList?&category=${this.category? this.category : ''}&token=${token}&pageNo=${this.pageNo}&pageSize=${this.size}`,
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