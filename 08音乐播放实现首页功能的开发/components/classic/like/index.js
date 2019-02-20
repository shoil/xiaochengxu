// components/classic/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean,
      value:false
    },
    count:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:'images/like.png',
    noSrc:'images/unlike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(){
      var like = this.properties.like;
      var count = this.properties.count;
      if(like){
        this.setData({
          like:false,
          count:count-1
        })
      }else{
        this.setData({
          like:true,
          count:count+1
        })
      }
      var behavior = this.data.like
      this.triggerEvent('like',{
        behavior
      })
    }
  }
})
