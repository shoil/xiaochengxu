import {ClassicModel} from "../../models/classic";
import {LikeModel} from "../../models/like";
const classicModel = new ClassicModel();
const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res=>{
      console.log(res);
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
  }

})