(function ($) {
    var token = 'c19d42c4-fa86-420d-ac75-2a86f5d1268c'
    api({
        url: '/product/getList?token=' + token,
        method: 'POST',
        success: function (json) {
          json = {
            "code": 0,
            "data": {
              "list": [
                {
                  "category": 0,
                  "createTime": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                  },
                  "desc": "string",
                  "detail": "string",
                  "headImage": "string",
                  "id": 0,
                  "name": "string",
                  "otherImage": "string",
                  "skus": [
                    {
                      "createTime": {
                        "date": 0,
                        "day": 0,
                        "hours": 0,
                        "minutes": 0,
                        "month": 0,
                        "nanos": 0,
                        "seconds": 0,
                        "time": 0,
                        "timezoneOffset": 0,
                        "year": 0
                      },
                      "id": 0,
                      "price": 0,
                      "skuAttribute": "string",
                      "spuId": 0,
                      "stock": 0,
                      "updateTime": {
                        "date": 0,
                        "day": 0,
                        "hours": 0,
                        "minutes": 0,
                        "month": 0,
                        "nanos": 0,
                        "seconds": 0,
                        "time": 0,
                        "timezoneOffset": 0,
                        "year": 0
                      }
                    }
                  ],
                  "spuAttribute": {
                    "key": [
                      {
                        "id": 0,
                        "name": "string"
                      }
                    ],
                    "value": [
                      {
                        "id": 0,
                        "name": "string"
                      }
                    ]
                  },
                  "updateTime": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                  }
                }
              ],
              "totalCount": 0
            },
            "msg": "string"
          }
          return json
        }
    })
    
  })(jQuery);