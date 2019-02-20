// pages/my-search/my-search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMore:0,
    bottomMore:0
  },
  onPullDownRefresh: function () {
    this.setData({
      topMore:Math.random()
    })
  },
  onReachBottom(){
    this.setData({
      bottomMore:Math.random()
    })
  }
})