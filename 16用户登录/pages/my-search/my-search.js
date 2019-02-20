// pages/my-search/my-search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more:0
  },
  onPullDownRefresh(){
    this.setData({
      more:Math.random()
    })
  }
})