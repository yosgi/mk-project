
var token = sessionStorage.getItem('token');
new Vue({
  el: '#orderArea',
  data: {
    pageNo:0,
    list:[],
    total:0,
    size:10,
    totalCount:0
  },
  computed: {
   
  },
  created() {
    this.fetch()
  },
  computed:{
    
  },
  methods:{
    getStatus(num) {
        var text='未知'
        if (num === 40) {
            text= '已完成'
        } else if (num === 10) {
            text= '去付款'
        } else if (num === 20) {
            text= '确认收货'
        }
        return text
        
    },
    getTime(date) {
       
        return moment(date).format('YYYY-MM-DD , hh:mm:ss a')
    },
    confirm(Id) {
      var _this = this
      api({
          url: `/order/confirmReceive?&orderId=${Id}`,
          method: 'POST',
          success: function (json) {
            data = json.data
            _this.total= data.totalCount
            _this.list = data.list
          }
      })
    },
    fetch() {
      var _this = this
      api({
          url:  `/order/getList?&pageNo=${this.pageNo}&pageSize=${this.size}`,
          method: 'POST',
          success: function (json) {
            data = json.data
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