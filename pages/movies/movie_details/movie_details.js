// pages/movies/movie_details/movie_details.js
const httpUtils = require('../../../utils/netutils.js');
const movieDetailsUrls = require('../../../urlconfig.js').movieDetailsUrl;
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetails: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getMovieDetails(id);
  },
  /**
   * 获取电影详情数据
   */
  getMovieDetails: function (id) {
    var data = {};
    httpUtils.http(movieDetailsUrls + "/" + id, data, this.successCallBack);
  },
  /**
   *成功之后的回调
   */
  successCallBack: function (res) {
    /**
     * 处理导演信息
     */
    var director = {
      name: '',
      id: '',
      avatar: ''
    }
    if (res.data.directors[0] != null) {
      director.name = res.data.directors[0].name;
      director.id = res.data.directors[0].id;
      director.avatar = res.data.directors[0].avatars.large;
    }
    /**
     * 处理其他电影信息
     */
    var movieDetails = {
      movieImg: res.data.images ? res.data.images.large : "",
      country: res.data.countries[0],
      title: res.data.title,
      originalTitle: res.data.original_title,
      wishCount: res.data.wish_count,
      commentCount: res.data.comments_count,
      years: res.data.year,
      genres: res.data.genres.join('/'),
      stars: utils.starscanvas2Array(res.data.rating.stars),
      score: res.data.rating.averge,
      director: director,
      summary: res.data.summary,
      casts: utils.converToCastString(res.data.casts),
      castsInfo: utils.converToCastInfo(res.data.casts)
    }
    wx.setNavigationBarTitle({
      title: res.data.title
    })
    this.setData({
      movieDetails: movieDetails
    });
  }
})