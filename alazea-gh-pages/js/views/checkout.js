(function ($) {
  var addressData = []
  var isUpdate = false;
  var curId = 0;
  function getList() {
    api({
      url: '/address/list?token=' + sessionStorage.getItem('token') + '&pageNo=1&pageSize=1',
      method: 'POST',
      data: {
        token: sessionStorage.getItem('token'),
        pageNo: 1,
        pageSize: 1
      },
      success: function (json) {
        var json = JSON.parse(json)
        var list = []
        if (json.data && json.data.list) {
          list = json.data.list
          addressData = list;
        }
        var frag = document.createDocumentFragment()
        for (var i = 0; i < list.length; i++) {
          var ele = document.createElement('a');
          ele.className = 'list-group-item'
          ele.id = i
          ele.href = '#'
          ele.innerHTML = '地址：' + list[i].address + '   姓名：' + list[i].receiverName + '   电话：' + list[i].phone
          frag.appendChild(ele)
        }
        document.getElementById('address_list').innerHTML = ''
        document.getElementById('address_list').appendChild(frag)
      }
    })
  }
  $('#addressAdd').on('click', function (e) {
    $('#address_mes').show();
    $('#address_list').hide()
    $('#conformDiv').show()
    $('#addressAdd').hide()
    return false
  })
  $('#addressCancel').on('click', function () {
    getList();
    $('#address_mes').hide();
    $('#address_list').show()
    $('#conformDiv').hide()
    $('#addressAdd').show()
    $('#phone_number').val('')
    $('#usrname').val('')
    $('#address').val('')
    $('#phoneNull').hide()
    $('#addrssNull').hide()
    curId = 0
    isUpdate = false
    return false
  })
  $('#addressConfirm').on('click', function () {
    $('#phoneNull').hide()
    $('#addrssNull').hide()
    var phone = $('#phone_number').val()
    var usrname = $('#usrname').val()
    var address = $('#address').val()
    if (phone === '') {
      $('#phoneNull').show()
      return false
    }
    if (address === '') {
      $('#addrssNull').show()
      return false
    }
    if (isUpdate) {
      api({
        url: '/address/updateAddress?token=' + sessionStorage.getItem('token') + '&receiverName=' + usrname + '&phone=' + phone + '&address=' + address + '&addressId=' + curId,
        method: 'POST',
        success: function (json) {
          getList();
          $('#address_mes').hide();
          $('#address_list').show()
          $('#conformDiv').hide()
          $('#addressAdd').show()
          $('#phone_number').val('')
          $('#usrname').val('')
          $('#address').val('')
          curId = 0
          return false
        }
      })
    } else {
      api({
        url: '/address/createAddress?token=' + sessionStorage.getItem('token') + '&receiverName=' + usrname + '&phone=' + phone + '&address=' + address,
        method: 'POST',
        success: function (json) {
          getList();
          $('#address_mes').hide();
          $('#address_list').show()
          $('#conformDiv').hide()
          $('#addressAdd').show()
          return false
        }
      })
    }
    isUpdate = false
    return false
  })
  $('#address_list').on('click', function (e) {
    var id = e.target.id;
    var mes = addressData[id];
    $('#phone_number').val(mes.phone)
    $('#usrname').val(mes.receiverName)
    $('#address').val(mes.address)
    $('#address_mes').show();
    $('#address_list').hide()
    $('#conformDiv').show()
    $('#addressAdd').hide()
    curId = mes.id;
    isUpdate = true
    return false
  })
  getList()
})(jQuery);