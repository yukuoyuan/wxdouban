/**
 * 这是一个封装的网络请求的工具类 
 * @parm url 路径
 * @parm data 数据
 * @parm callBack 请求回调
 */
function http(url,data,callBack){
  var that = this;
  wx.request({
    url: url,
    data: data,
    header: {
      "Content-Type": "json"
    },
    method: 'GET',
    success: function (res) {
      console.log(res);
      callBack(res)
    },
    fail: function (res) {
      console.log(res);
      wx.showToast({
        title: res
      })
    },
    complete: function (res) {

    },
  })
}
module.exports = {
  http: http
}