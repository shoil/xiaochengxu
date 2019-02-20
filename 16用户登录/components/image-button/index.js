// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    openType:String
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
      const userInfo = event.detail.userInfo;
      this.triggerEvent('onGet',{
        userInfo
      });
    }
  }
})
