// pages/my/my.js
import {
  ClassicModel
} from "../../models/classic";
const classicModel = new ClassicModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    authorized: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 得到用户授权的相关信息 */
    this._authorize(); 
  },
  onShow(){
    this._getFavor(); 
  },
  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo;
    if(userInfo){
      this.setData({
        userInfo,
        authorized: true
      })
    }
    
  },
  _authorize() {
    wx.getSetting({
      success: (res) => {
        /* 判断用户是否授权 */
        if (res.authSetting['scope.userInfo']) {
          /* 获取用户相关信息 */
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })
            }
          })
        }
      }
    });
  },
  _getFavor() {
    classicModel.getFavor(res => {
      this.setData({
        likes: res
      })
    })
  }
})