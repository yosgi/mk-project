
var token = sessionStorage.getItem('token');
console.log(i18n.t('portfolio.filters'));
  new Vue({
    // el: '.alazea-portfolio-area',
    el: '#productPage',
    i18n,
    data: {
      pageNo:0,
      list:[],
      total:0,
      size:30,
      map: i18n.t('portfolio.filters'),
      cur:0,
      loading:true,
      currentYear: new Date().getFullYear()
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
      switchLocale(lang) {
        switchLocale(lang)
        this.map = i18n.t('portfolio.filters')
      },
      getLg(index) {
        return (index - 1) % 3 === 0 ? 6 : 3
      },
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
          $('.portfolio-filter').on('click', 'button', function () {
              var filterValue = $(this).attr('data-filter');
              $grid.isotope({
                  filter: filterValue
              });
          });
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
