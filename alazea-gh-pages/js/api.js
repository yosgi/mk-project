var token = sessionStorage.getItem('token');
(function ($) {
  'use strict';
  // var baseUrl = 'http://127.0.0.1:3001'
  var baseUrl = 'http://minmakeitnow.com/'
  function api(args) {
    if (args.data && typeof args.data === 'object' && !!token) {
      args.data.token = token
    }
    var contentType = args.contentType || 'application/x-www-form-urlencoded';
    var url = args.url;
    var method = args.method;
    var data = args.data;
    var success = args.success
    var error = args.error

    $.ajax({
      url: baseUrl + '/api' + url,
      type: method,
      success: function (json) {
        if (json.code === 500) {
          if (json.msg === 'token过期，请重新登录') {
            sessionStorage.removeItem('token')
            showLogin()
            $.sendWarning('超时，请重新登录', 3000);
          } else {
            $.sendWarning(json.msg);
          }
        }  else {
          success(json)
        }

      },
      data:data,
      error: error,
      contentType,
      dataType: 'json',

    })
  }
  window.api = api
})(jQuery);
