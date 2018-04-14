// pages/movies/movie_details/movie_details.js
import { GetMovieDetails } from 'class/GetMovieDetails.js';
const httpUtils = require('../../../utils/netutils.js');
const movieDetailsUrls = require('../../../urlconfig.js').movieDetailsUrl;

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
    wx.showLoading({
      title: '加载中',
    })
    /**
     * 通过ES6形式进行获取电影详情
     */
    var getmovie = new GetMovieDetails(movieDetailsUrls + "/" + id, data);
    var that = this;
    getmovie.getMovieDetails(function (movieDetails) {
      wx.hideLoading()
      that.setData({
        movieDetails: movieDetails
      });
    });
  },
  /**
   * 预览图片
   */
  previewImage: function (event) {
    console.log(event)
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
  }
})