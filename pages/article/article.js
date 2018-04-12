var articleListData = require("../../data/article_list_data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipeUrls: [
      '/image/swipe_1.png',
      '/image/swipe_2.png',
      '/image/swipe_3.png'
    ],
    articleList: [
    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articleList: articleListData.postList
    })
  },
  /**
   * 跳转详情
   */
  jumpDetails: function (event) {
    console.log("点击了", event)
    wx.navigateTo({
      url: 'article_details/article_details?id=' + event.currentTarget.dataset.bind,
    })
  },
  /**
   * 跳转详情
   */
  swiperjumpDetails: function (event) {
    console.log("点击了", event)
    // target 指的是当前点击的组件
    // currentTarget指的是事件捕获的组件
    wx.navigateTo({
      url: 'article_details/article_details?id=' + event.target.dataset.bind,
    })
  }
})