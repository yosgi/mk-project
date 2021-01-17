(function ($) {
  var canClick = true;
  function register(data) {
    api({
      url: '/user/register',
      method: 'POST',
      data:data,
      success: function (json) {
        $('#vsrifyError').hide()
        $('#vsrifyEmailError').hide()
        $('#vsrifyPhoneError').hide()
        if (json.code === 500) {
          if (json.msg === 'Incorrect verification code') {
            $('#vsrifyError').show();
          }
          if (json.msg === 'the email already registry, you can login directly') {
            $('#vsrifyEmailError').show()
          }
          if (json.msg === 'the phone already registry, you can login directly') {
            $('#vsrifyPhoneError').show()
          }
        } else {
          $('#registerSucess').show()
          $('#vsrifyError').hide()
          $('#vsrifyEmailError').hide()
          $('#vsrifyPhoneError').hide()
          login(data)
          setTimeout(function () {
            $('#registerSucess').hide()
            $('#login-form').hide();
            $('#register-form').show();
            location.reload()
          }, 3000)         
        }
        return false
      }
    })
  }
  function login(data) {
    api({
      url: '/user/login',
      method: 'POST',
      data: data,
      success: function (json) {
        if (json.code === 500) {
          $('#passwordError').show()
        } else {
          sessionStorage.setItem('token', json.data.token)
          $('#loginSucess').show();
          setTimeout(function () {
            $('#loginSucess').hide();
            // window.location.href = 'index.html';
          }, 3000)
        }
        return false
      }
    })
  }
  /**验证码 */
  $('#sendVerifyCode').on('click', function (e) {
    $('#vsrifyError').hide()
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
    var data = {
      name: name,
      password: password,
      email: email,
      verifyCode: verifyCode,
      phone: phone,
      company: company,
    }
    register(data)
  })
  /**点击跳转注册 */
  $('#login-register').on('click', function (e) {
    $('#login-form').hide();
    $('#register-form').show();
  })
  /**点击返回 */
  $('#goback').on('click', function (e) {
    $('#login-form').show();
    $('#register-form').hide();
  })
  /**点击登录 */
  $('#login').on('click', function (e) {
    var name = $('#username1').val()
    var password = $('#password1').val()
    var data = {
      password: password
    }
    if (/^[0-9]+$/.test(name)) {
      data.phone = name;
    } else {
      data.email = name
    }
    $('#passwordError').hide()
    login(data)
  })  
})(jQuery);