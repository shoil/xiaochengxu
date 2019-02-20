import {
  BookModel
} from "../../models/book";
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    value: 123
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getNetWorkData(options.id);

  },
  _getNetWorkData(id) {
    const detail = bookModel.getBookDetail(id);
    const comments = bookModel.getBookComment(id);
    const likeStatus = bookModel.getBookLike(id);
    Promise.all([detail, comments, likeStatus]).then(res => {
      let [detail, comments, likeStatus] = res;
      this.setData({
        detail,
        comments: comments.comments,
        id,
        likeStatus
      })
    })
  },
  onTap() {
    this.setData({
      isShow: true
    })
  },
  onCancel() {
    this.setData({
      isShow: false
    })
  },
  onConfirm(event) {
    var value = event.detail.value.search;
    if (typeof value == "function") {
      value = event.detail.value;
    }
    var obj = {
      content: value,
      nums: 1
    }
    if (value) {
      this.data.comments.unshift(
        obj
      )
      /* 新增短评 */
      bookModel.addNewComment(this.data.id, value).then(res => {
        wx.showToast({
          title: '新增1个短评',
          icon: 'none'
        })
      })

    }
    this.setData({
      comments: this.data.comments
    })


  }


})