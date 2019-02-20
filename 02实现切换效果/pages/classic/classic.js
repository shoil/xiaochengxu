import {ClassicModel} from "../../models/classic";
import {LikeModel} from "../../models/like";
const classicModel = new ClassicModel();
const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:{},
    /* 定义是否为最新的一期 */
    
    isLatest:true,
    /* 是否为第一期 */
    isFirst:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res=>{
      this.setData({
        classic:res
      })
    })
  },
  onLike(e){
    var behavior = e.detail.behavior;
    var id = this.data.classic.id;
    var type = this.data.classic.type;
    likeModel.getLike(behavior,id,type);
  },
  onPrev(){
    classicModel.getPrevious(this.data.classic.index,res=>{
      this.setData({
        classic:res,
        // 更新是否为第一期的状态
        isFirst:classicModel.isFirst(res.index),
        isLatest:classicModel.isLatest(res.index)
      })
     
    })
  },
  onNext(){
    classicModel.getNext(this.data.classic.index,res=>{
      this.setData({
        classic:res,
        // 更新是否为第一期的状态
        isFirst:classicModel.isFirst(res.index),
        isLatest:classicModel.isLatest(res.index)
      })
      
    })
  }
})