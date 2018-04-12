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
    
  },

  /**
   * 跳转主界面
   */
  jumpIndex: function () {
    console.log('跳转主界面');
    wx.switchTab({
      url: '../article/article',
    })
  }
})