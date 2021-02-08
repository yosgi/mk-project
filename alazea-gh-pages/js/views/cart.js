var lib = new localStorageDB('library', localStorage);

var token = sessionStorage.getItem('token');
window.onload = function () {
  new Vue({
    el: '#cartPage',
    i18n,
    data: {
      list: [],
      address:[],
      curAddress:'',
      orderId:0,
      login:true,
      currentYear: new Date().getFullYear()
    },
    computed: {
      total() {
        return this.list.reduce(function (total, cur)  {
          return new Decimal(total).plus(new Decimal(cur.price). mul(new Decimal(cur.count)))
        }, 0);
      },
    },
    created() {
      this.fetch();
    },
    methods: {
      switchLocale(lang) {
        switchLocale(lang) // from locale.js
      },
      deleteOne(ID) {
        lib.deleteRows('products', { ID });
        lib.commit()
          this.fetch();
      },
      createOrder(e) {
        var _this = this
        e.preventDefault()
        if (!token) {
          this.login = false
        } else {
          this.login = true
        }
        var product = lib.queryAll('products');
        api({
          url: '/order/createOrder?token=' + token,
          method: 'POST',
          contentType:'application/json',
          data:JSON.stringify({
            addressId:this.curAddress,
            orderDetail:product
          }),
          success:function (json)  {
            _this.orderId = json.data.orderId
            _this.pay()
          }
        })
      },
      pay() {
        api({
          url: '/pay/alipay?token='+token + '&orderId=' + this.orderId,
          method: 'POST',
          contentType:'application/json',
          success:function (json) {
            console.log(json)
          },
          error:function (err) {
            $('body').html(err.responseText)
            console.log(err.responseText)
          }
        })
      },
      getAdress() {
        var _this = this
        api({
          url: '/address/list',
          method: 'POST',
          data:{
            pageNo:0,
            pageSize:10
          },
          success:function(json) {
            _this.address = json.data.list
              if (_this.address && _this.address.length) {
                _this.curAddress = _this.address[0].id
              }
          }
      })
      },
      change(ID, flag) {//flag  增加减少
          var product = lib.query('products', { ID })[0];
            if (product === 1) {
              lib.deleteRows('products', { ID });
            } else {
              lib.update('products', { ID }, function (row) {
              if (flag)	 row.count ++
              else row.count --
                    return row;
              });
          }
          lib.commit()
          this.fetch();
      },
      fetch() {
        this.getAdress()
        this.list = lib.queryAll('products');
      },
    },
  });
};
