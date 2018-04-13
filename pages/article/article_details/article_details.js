var articleListData = require("../../../data/article_list_data.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articledetails: {},
    isColllection: false,
    id: '',
    isPlayAudio: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    })
    var articledetails = articleListData.postList[id];
    this.setData({
      articledetails: articledetails
    })
    /*
    是否被收藏判断
     */
    var articleCollectionList = wx.getStorageSync('articleCollectionList')
    /**
     * 如果有这个列表
     */
    if (articleCollectionList) {
      this.setData({
        isColllection: articleCollectionList[id]
      })
    } else {
      articleCollectionList = [];
      articleCollectionList[id] = false;
      wx.setStorageSync('articleCollectionList', articleCollectionList);
    }
    if (app.LocalData.isPlayingMusic && id == app.LocalData.playingMusicId) {
      this.setData({
        isPlayAudio: true
      })
    } else {
      this.setData({
        isPlayAudio: false
      })
    }
    /**监听音乐 */
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayAudio: true
      })
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayAudio: false
      })
      app.LocalData.isPlayingMusic = false;
      app.LocalData.playingMusicId = "";
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayAudio: false
      })
      app.LocalData.isPlayingMusic = false;
      app.LocalData.playingMusicId = "";
    })
  },
  /**
   * 收藏接口
   */
  collection: function () {
    var articleCollectionList = wx.getStorageSync('articleCollectionList');
    articleCollectionList[this.data.id] = !this.data.isColllection;
    wx.setStorageSync('articleCollectionList', articleCollectionList);
    this.setData({
      isColllection: !this.data.isColllection
    })
    wx.showToast({
      title: this.data.isColllection ? '收藏成功' : '取消成功',
      icon: 'none',
      duration: 1000
    })
  },
  /**
   * 分享按钮点击之后调用的方法
   */
  shareAction: function (event) {
    /**
     * 这里选择的条目最多留个
     */
    wx.showActionSheet({
      itemList: [
        '分享给微信好友',
        '分享到朋友圈',
        '分享给QQ好友',
        '分享到QQ圈',
        '分享到微博'
      ],
    })
  },
  /**
   * 播放音乐
   */
  onMusicAction: function () {
    var isPlayMusic = this.data.isPlayAudio;
    if (isPlayMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayAudio: false
      })
    } else {
      /**
       * 没有音乐在播放
       */
      this.playAudio();
    }
  },
  /**
   * 播放音乐
   */
  playAudio: function () {
    this.setData({
      isPlayAudio: true
    })
    app.LocalData.isPlayingMusic=true;
    app.LocalData.playingMusicId = this.data.id;
    var articledetails = articleListData.postList[this.data.id];
    /**
     * 后台播放音乐
     */
    wx.playBackgroundAudio({
      dataUrl: articledetails.music.url,
      title: articledetails.music.title,
      coverImgUrl: articledetails.music.coverImg
    })
  }
})