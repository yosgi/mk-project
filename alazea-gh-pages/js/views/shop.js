(function ($) {
    var token = 'c19d42c4-fa86-420d-ac75-2a86f5d1268c'
    api({
        url: '/product/getList?token=c19d42c4-fa86-420d-ac75-2a86f5d1268c&pageNo=1&pageSize=10',
        method: 'POST',
        data: {

        },
        success: function (json) {
          console.log(json)
          return false
        }
    })
    
  })(jQuery);