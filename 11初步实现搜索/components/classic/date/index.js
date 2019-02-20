// components/classic/date/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number
    }
  },
  data: {
    year:0,
    month:0
  },
  methods: {

  },
  attached(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.setData({
      year,
      month
    })
  }
})
