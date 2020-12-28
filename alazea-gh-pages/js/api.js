(function ($) {
  'use strict';
  var baseUrl = 'http://47.115.38.175'
  function api(args) {
    var url = args.url;
    var method = args.method;
    var data = args.data;
    var success = args.success
    var error = args.error
    $.ajax({
      url: baseUrl+ '/' + url, //上线请删除/api
      type: method,
      success: success,
      data: data,
      error: error
    })
  }
  window.api = api
})(jQuery);