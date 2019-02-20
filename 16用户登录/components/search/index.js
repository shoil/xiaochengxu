// components/search/index.js
import {
  Keyword
} from "../../models/keyword";
const keyword = new Keyword();
import {
  BookModel
} from "../../models/book";
const bookModel = new BookModel();
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
    words: [],
    hots: [],
    books: [],
    isSearch: false,
    /* 给输入框默认值 */
    value: "",
    /* 是否显示空的搜索结果 */
    isResult: false,
    loading: false,
    isClear: false
  },
  methods: {
    onConfirm(event) {
      let value = event.detail.value;
      this._addDataHistory(value);
    },
    onClear() {
      this.setData({
        value: "",
        isSearch: false,
        books: [],
        isResult: false,
        isClear: false
      })
    },
    onScroll() {
      this._loadmore();
    },

    onBack() {
      wx.switchTab({
        url: '/pages/book/book',
      })
      // wx.navigateBack({
      //   delta: 1
      // })
    },
    onInput(event) {
      const value = event.detail.value;
      if (value) {
        this.setData({
          isClear: true
        })
      } else {
        this.setData({
          isClear: false
        })
      }
    },
    _loadmore() {
      /* 加载更多数据 */
      var start = this.data.books.length;
      var value = this.data.value;
      if (start < this.data.total) {
        this.setData({
          loading: true
        })
        bookModel.getBookSearch(start, value).then(res => {
          let arr = this.data.books.concat(res.books);
          this.setData({
            books: arr,
            loading: false
          })

        })
      }
    },
    _addDataHistory(value) {
      wx.showLoading({
        title: "加载数据"
      });
      /* 只有在服务器上能搜索到的关键词才添加到缓存中 */
      bookModel.getBookSearch(0, value).then(res => {
        if (res.total) {
          keyword.addHistory(value);
          let words = keyword.getHistory();
          this.setData({
            words,
            books: res.books,
            isSearch: true,
            isResult: false,
            value,
            total: res.total,
            isClear: true
          })
          wx.hideLoading();
        } else {
          this.setData({
            isResult: true,
            isSearch: true,
            value,
            books: []
          })
          wx.hideLoading();
        }

      })
    }
  },
  attached() {
    // keyword.getHistory();
    this.setData({
      words: keyword.getHistory()
    })
    keyword.getHotData().then(res => {
      this.setData({
        hots: res.hot
      })
    })

  }
})