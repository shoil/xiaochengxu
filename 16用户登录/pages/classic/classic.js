import {
  ClassicModel
} from "../../models/classic";
import {
  LikeModel
} from "../../models/like";

const classicModel = new ClassicModel();
const likeModel = new LikeModel();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    /* 定义是否为最新的一期 */

    isLatest: true,
    /* 是否为第一期 */
    isFirst: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      this.setData({
        classic: res,
        like:res.like_status,
        count:res.fav_nums
      })
    })
  },
  onLike(e) {
    var behavior = e.detail.behavior;
    var id = this.data.classic.id;
    var type = this.data.classic.type;
    likeModel.getLike(behavior, id, type);
    
  },
  onPrev() {
    this._updateData("previous");
  },
  onNext() {
    this._updateData("next");
  },
  _updateData(nextOrprevious) {
    
    classicModel.getClassic(this.data.classic.index,
      nextOrprevious, res => {
        /* 更新点赞的状态 */
        likeModel.getLikeStatus(res.type,res.id,res=>{
          this.setData({
            like:res.like_status,
            count:res.fav_nums
          })
        })

        this.setData({
          classic: res,
          // 更新是否为第一期的状态
          isFirst: classicModel.isFirst(res.index),
          isLatest: classicModel.isLatest(res.index)
        })

      })


  },
  /*  open-type='share'事件触发,执行onShareAppMessage事件*/
  onShareAppMessage(){
    console.log(1);
  }
})