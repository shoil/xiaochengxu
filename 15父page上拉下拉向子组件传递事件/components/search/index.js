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
    topMore:{
      type:Number,
      observer:"onPull",
    },
    bottomMore:{
      type:Number,
      observer:"onBottom"
    }
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
    value:""
  },
  methods: {
    onPull(){
      this.setData({
        books:[]
      })
      bookModel.getBookSearch(0,this.data.value).then(res=>{
        this.setData({
          books:res.books
        })
      })
    },
    onBottom(){
       const start = this.data.books.length;
       let value = this.data.value;
       bookModel.getBookSearch(start,value).then(res=>{
         this.data.books.push(...res.books);
         this.setData({
           books:this.data.books
         })
       })
    },
    onConfirm(event) {
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
            value
          })
         
        }
      })
    },
    onToggle(){
      this.setData({
        value:"",
        isSearch:false
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