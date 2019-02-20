// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    words: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      let value = event.detail.value;
      let words = wx.getStorageSync('q');
      let has = words.includes(value);
      if (value && !has) {
        if(words.length>3){
          words.pop();
        }
        words.unshift(value);
        this.setData({
          words
        })
      }
      wx.setStorageSync('q', words);

    }
  },
  attached() {
    var words = wx.getStorageSync('q');
    if (words) {
      this.setData({
        words
      })
      console.log(words);
    } else {
      wx.setStorageSync('q', [])
    }
  }
})