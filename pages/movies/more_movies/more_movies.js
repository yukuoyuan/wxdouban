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
    navigationBarTitleText: "",
    settingKey: '',
    pageIndex: 0,
    apiUrl: '',
    movies: []
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
        this.setData({
          settingKey: 'inTheatersMovies',
          apiUrl: inTheatersUrls
        })
        break;
      case "即将热映":
        this.setData({
          settingKey: 'comingSoonMovies',
          apiUrl: comingSoonUrls
        })
        break;
      case "Top250":
        this.setData({
          settingKey: 'top250Movies',
          apiUrl: top250Urls
        })
        break;
    }
    this.getMovieListData(this.data.apiUrl);
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
  getMovieListData: function (apiUrl) {
    var data = {};
    data.start = this.data.pageIndex;
    data.count = 20;
    httpUtils.http(apiUrl, data, this.successCallBack)
  },
  /**
   * 回调
   */
  successCallBack: function (res) {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    console.log(res);
    var movies = [];
    var length = res.data.subjects.length
    for (var i = 0; i < length; i++) {
      var subject = res.data.subjects[i];
      var title = subject.title;
      /**
       * 处理名字
       */
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      } else {
        title = title;
      }
      /**
       * 处理星星转换为一个数组
       */
      var starsarray = this.starscanvas2Array(subject.rating.stars);
      var movie = {
        name: title,
        id: subject.id,
        score: subject.rating.average,
        converurl: subject.images.large,
        starsarray: starsarray
      };
      movies.push(movie);
    }
    console.log(movies);
    /**
     * 如果是下拉刷新或者是初次加载的数据的话
     */
    if (this.data.pageIndex == 1) {
      this.setData({
        movies: movies
      })

    } else {
      this.setData({
        movies: this.data.movies.concat(movies)
      })
    }
    wx.stopPullDownRefresh();
    wx.hideLoading();
  },
  /**
  * 转换为星星的数组
  */
  starscanvas2Array: function (stars) {
    var num = stars.substring(0, 1);
    var array = [];
    for (var i = 0; i <= 5; i++) {
      if (i < num) {
        array.push(1);
      } else {
        array.push(0);
      }
    }
    return array;
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 0
    })
    this.getMovieListData(this.data.apiUrl);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMovieListData(this.data.apiUrl);
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})