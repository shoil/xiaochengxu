import {BookModel} from "../../models/book";
const bookModel  = new BookModel();
Page({
  data: {
    books:[]
  },
  onLoad: function (options) {
    bookModel.getHotBook().then(res=>{
      this.setData({
        books:res
      })
    })
  },
  onTap(){
    wx.navigateTo({
      url: '/pages/my-search/my-search'
    })
  }

})