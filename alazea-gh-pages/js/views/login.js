(function ($) {
  var canClick = true;
  /**验证码 */
  $('#sendVerifyCode').on('click', function (e) {
    if (!canClick) {
      return false
    }
    var phone = $('#phone').val()
    api({
      url: '/user/sendVerifyCode',
      method: 'POST',
      data: {
        phone: phone
      },
      success: function (json) {
        console.log(json)
        return false
      }
    })
    var sum = 60;
    $('#sendVerifyCode').text("还剩" + sum + "秒可发送")
    $('#sendVerifyCode').removeClass('btn-primary')
    var timer = setInterval(function () {
      canClick = false
      sum--;
      if (sum === 0) {
        clearInterval(timer)
        $('#sendVerifyCode').addClass('btn-primary')
        $('#sendVerifyCode').text('发送验证码')
        canClick = true
      }
      if (sum) {
        $('#sendVerifyCode').text("还剩" + sum + "秒可发送")
      }
    }, 1000)
    return false
  })
  /**注册 */
  $('#register').on('click', function (e) {
    var name = $('#username').val();
    var password = $('#password').val()
    var comfirmPassword = $('#password2').val()
    var email = $('#email').val()
    var company = $('#company').val()
    var phone = $('#phone').val()
    var verifyCode = $('#VerifyCode').val()
    api({
      url: '/user/register',
      method: 'POST',
      data: {
        name: name,
        password: password,
        email: email,
        verifyCode: verifyCode,
        phone: phone,
        company: company,
        success: function () {

        }
      },
      success: function (json) {
        console.log(json)
        return false
      }
    })
  })
})(jQuery);