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
    books:[],
    isSearch:false,
    /* 给输入框默认值 */
    value:"",
    /* 是否显示空的搜索结果 */
    isResult:false
  },
  methods: {
    onConfirm(event) {
      wx.showLoading({
        title:"加载数据"
      });
      let value = event.detail.value;
      /* 只有在服务器上能搜索到的关键词才添加到缓存中 */
      bookModel.getBookSearch(0, value).then(res => {
        if (res.total) {
          keyword.addHistory(value);
          let words = keyword.getHistory();
          this.setData({
            words,
            books:res.books,
            isSearch:true,
            isResult:false,
            value
          })
          wx.hideLoading();
        }else{
          wx.showToast({
            title: '抱歉,你搜索的内容为空',
            icon: 'none'
          })
          this.setData({
            isResult:true,
            isSearch:true,
            value,
            books:[]
          })
          
        }
        
      })
    },
    onClear(){
      this.setData({
        value:"",
        isSearch:false,
        books:[],
        isResult:false
      })
    },
    onScroll(){
      console.log(1);
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