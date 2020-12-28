var lib = new localStorageDB('library', localStorage);

var token = '812ca916-d1f3-4e68-888c-5cb553fc4f78';
window.onload = function () {
  new Vue({
    el: '#cartArea',
    data: {
      list: [],
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
      change(ID, flag) {
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
        this.list = lib.queryAll('products');
      },
    },
  });
};
