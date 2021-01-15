var lib = new localStorageDB('library', localStorage);

var token = sessionStorage.getItem('token');
window.onload = function () {
  new Vue({
    el: '#cartArea',
    data: {
      list: [],
      address:[],
      curAddress:''
    },
    computed: {
      total() {
        return this.list.reduce((total, cur) => {
          return new Decimal(total).plus(new Decimal(cur.price). mul(new Decimal(cur.count)))
        }, 0);
      },
    },
    created() {
      this.fetch();
    },
    methods: {
      deleteOne(ID) {
        lib.deleteRows('products', { ID });
        lib.commit()
          this.fetch();
      },
      createOrder(e) {
        e.preventDefault()
        var product = lib.queryAll('products');
        console.log(product)
        api({
          url: '/order/createOrder?token=' + token,
          method: 'POST',
          contentType:'application/json',
          data:JSON.stringify({
            addressId:this.curAddress,
            orderDetail:product
          }),
          success:(json) => {
            debugger
          }
      })
      },
      getAdress() {
        api({
          url: '/address/list',
          method: 'POST',
          data:{
            pageNo:0,
            pageSize:10
          },
          success:(json) => {
              this.address = json.data.list
              if (this.address && this.address.length) {
                this.curAddress = this.address[0].id
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
