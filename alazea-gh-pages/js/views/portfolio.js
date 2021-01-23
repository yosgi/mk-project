
var token = sessionStorage.getItem('token');
  new Vue({
    el: '.alazea-portfolio-area',
    data: {
      pageNo:0,
      list:[],
      total:0,
      size:30,
      map:['所有','餐具','水瓶','饭兜','其它'],
      cur:0,
      loading:true
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
              _this.loading = false
              _this.total= data.totalCount
              _this.list = data.list
              _this.addFilterAction()
            }
        })
      },
      addFilterAction() {
        $('.alazea-portfolio').imagesLoaded(function () {
          // filter items on button click
          $('.portfolio-filter').on('click', 'button', function () {
              var filterValue = $(this).attr('data-filter');
              $grid.isotope({
                  filter: filterValue
              });
          });
          // init Isotope
         
          var $grid = $('.alazea-portfolio').isotope({
              itemSelector: '.single_portfolio_item',
              percentPosition: true,
              masonry: {
                  columnWidth: '.single_portfolio_item'
              }
          });
      });
      },
      nextPage() {
        if (this.pageNo < this.page.length - 1) {
          this.pageNo ++
          this.fetch()
        }
      }
    }    
  })