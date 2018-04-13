// pages/movies/movie_details/movie_details.js
const httpUtils = require('../../../utils/netutils.js');
const movieDetailsUrls = require('../../../urlconfig.js').movieDetailsUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    var data={};
    httpUtils.http(movieDetailsUrls+"/"+id,data,this.successCallBack);
  },
  /**
   *成功之后的回调
   */
  successCallBack:function(res){
  }
})