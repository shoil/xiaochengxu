import {HTTP} from "../utils/http";
class ClassicModel extends HTTP{
    getLatest(callback){
        this.request({
            url:"/classic/latest",
            success:res=>{
                let index=res.index;
                callback(res);
                wx.setStorageSync('latest', res.index)
            }
        })
    }
    // getPrevious(index,callback){
    //     this.request({
    //         url:`/classic/${index}/previous`,
    //         success:res=>{
    //             callback(res);
    //         }
    //     })
    // }
    // getNext(index,callback){
    //     this.request({
    //         url:`/classic/${index}/next`,
    //         success:res=>{
    //             callback(res);
    //         }
    //     })
    // }
    getClassic(index,nextOrprevious,callback){
        this.request({
            url:`/classic/${index}/${nextOrprevious}`,
            success:res=>{
                callback(res);
            }
        })
    }
    isFirst(index){
        return index==1?true:false
    }
    isLatest(index){
        const latest = wx.getStorageSync('latest');
        return index==latest?true:false;
    }
}
export {ClassicModel};