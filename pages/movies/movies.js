//获取url路径
const inTheatersUrls = require('../../urlconfig').inTheatersUrl;
const comingSoonUrls = require('../../urlconfig').comingSoonUrl;
const top250Urls = require('../../urlconfig').top250Url;
const searchMovieUrls = require('../../urlconfig').searchMovieUrl;
const httpUtils = require('../../utils/netutils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheatersMovies: {},
    comingSoonMovies: {},
    top250Movies: {},
    containerShow: true,
    searchContainerShow: false,
    pageIndex: 0,
    movies: []
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
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more_movies/more_movies?category=' + category,
    })
  },
  /**
   * 当输入框获取焦点的时候调用的方法
   */
  searchFocus: function (event) {
    console.log(event)
    this.setData({
      containerShow: false,
      searchContainerShow: true
    })
  },
  /**
   * 当输入框点击搜索按钮的时候调用的方法
   */
  searchBlurs: function (event) {
    console.log(event)
    var details = event.detail.value;
    if (details && details.length > 0) {
      wx.showLoading({
        title: '搜索中',
      })
      this.getSearchMovieListData(searchMovieUrls, details);
    }
  },
  /**
   * 当点击删除的时候调用的方法
   */
  deleteSeachInput: function () {
    this.setData({
      containerShow: true,
      searchContainerShow: false
    })
  },
  /**
   * 获取搜索的电影列表数据
   */
  getSearchMovieListData: function (apiUrl, details) {
    var data = {};
    data.start = this.data.pageIndex;
    data.count = 20;
    data.q = details;
    httpUtils.http(apiUrl, data, this.successCallBack)
  },
  /**
  * 回调
  */
  successCallBack: function (res) {
    this.setData({
      pageIndex: this.data.pageIndex + 20
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
    if (this.data.pageIndex == 20) {
      this.setData({
        movies: movies
      })
    } else {
      var defaultmovies = this.data.movies;
      this.setData({
        movies: defaultmovies.concat(movies)
      })
    }
    wx.stopPullDownRefresh();
    wx.hideLoading();
  },
  /**
   * 跳转详情
   */
  jumpDetails(event) {
    console.log(event.currentTarget.dataset.id);
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'movie_details/movie_details?id=' + id,
    })
  }
})