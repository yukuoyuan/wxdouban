// pages/movies/more_movies/more_movies.js
const inTheatersUrls = require('../../../urlconfig').inTheatersUrl;
const comingSoonUrls = require('../../../urlconfig').comingSoonUrl;
const top250Urls = require('../../../urlconfig').top250Url;
const httpUtils = require('../../../utils/netutils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigationBarTitleText: category
    })
    switch (category) {
      case "正在热映":
        this.getMovieListData(inTheatersUrls, "正在热映", "inTheatersMovies");
        break;
      case "即将热映":
        this.getMovieListData(comingSoonUrls, "即将热映", "comingSoonMovies");
        break;
      case "Top250":
        this.getMovieListData(top250Urls, "Top250", "top250Movies");
        break;
    }
    console.log(options.category)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitleText
    })
  },
  /**
   * 获取电影列表
   */
  getMovieListData: function (apiUrl, settingName, settingKey) {
    var data = {};
    data.start = 0;
    data.count = 20;
    httpUtils.http(apiUrl, data, this.callBack)
  },
  /**
   * 回调
   */
  callBack: function (res) {
    console.log(res);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})