function parseQueryString(url) {
    var arr;
    var res = {};
    //#符号之后的值称为hash，都不会加到request请求中去
    url = url.split('#')[0];
    //获取queryString 第一个？号后面的全是查询字符串
    arr = url.split('?');
    arr.shift();
    var queryStr = arr.join('?');
    //查询字符串为空直接返回 避免出现这样的返回值{"":""}
    if (queryStr.trim().length == 0) {
        return res;
    }

    //获取参数
    arr = queryStr.split('&');
    for (var i = 0; i < arr.length; i++) {
        var itemArr = arr[i].split('=');
        //第一个=号之前的是name 后面的全是值
        var name = itemArr.shift();
        var value = itemArr.join('=');
        res[name] = value;
    }
    return res;
}
$(document).ready(function () {
    var url = location.href
    var a = parseQueryString(url)
    var token = sessionStorage.getItem('token')
    if (a.auth_code && !token) {
        api({
            url: '/user/alipayLogin?authCode=' + a.auth_code,
            method: 'POST',
            success: function (json) {
                sessionStorage.setItem('token', json.data.token)
                showMe()
                $.sendSuccessToTop('登录成功！', 1000, function(){ 
                });
            }
        })
    }
});

