// pages/my/my.js
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
  confirm(event){
    let value = event.detail.value;
    if(typeof value !="string"){
      value =  event.detail.value.search;
    }
    console.log(value);
  }
})