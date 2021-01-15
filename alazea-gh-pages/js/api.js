var token = sessionStorage.getItem('token');
(function ($) {
  'use strict';
  var baseUrl = 'http://127.0.0.1:3000'
  function api(args) {
    if (args.data && typeof args.data === 'object') {
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
      success: success,
      data:data,
      error: error,
      contentType,
      dataType: 'json',
    })
  }
  window.api = api
})(jQuery);