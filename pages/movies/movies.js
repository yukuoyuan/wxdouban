//获取url路径
const inTheatersUrls = require('../../urlconfig').inTheatersUrl;
const comingSoonUrls = require('../../urlconfig').comingSoonUrl;
const top250Urls = require('../../urlconfig').top250Url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheatersMovies: {},
    comingSoonMovies: {},
    top250Movies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 获取正在热映
     */
    this.getMovieListData(inTheatersUrls, "正在热映", "inTheatersMovies");
    /**
     * 即将上映
     */
    this.getMovieListData(comingSoonUrls, "即将热映", "comingSoonMovies");
    /**
     * top250
     */
    this.getMovieListData(top250Urls, "Top250", "top250Movies");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 获取电影列表
   */
  getMovieListData: function (apiUrl, settingName, settingKey) {
    var that = this;
    wx.request({
      url: apiUrl,
      data: {
        "start": 0,
        "count": 3,
      },
      header: {
        "Content-Type": "json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.HandleListData(res.data.subjects, settingName, settingKey);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {

      },
    })
  },
  /**
   * 处理数据并绑定到界面
   */
  HandleListData: function (data, settingName, settingKey) {
    var movies = [];
    for (var ids in data) {
      var subject = data[ids];
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
    var readData = {};
    readData[settingKey] = {
      movies: movies,
      settingName: settingName
    };
    this.setData(readData);
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
   * 更多的电影
   */
  moreMovies: function (event) {
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more_movies/more_movies?category=' + category,
    })
  }
})