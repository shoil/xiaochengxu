import {HTTP} from "../utils/http";
class LikeModel extends HTTP{
    getLike(behavior,id,type){
        const url = behavior?"/like":"/like/cancel"
        this.request({
            url,
            method:"POST",
            data:{
                art_id:id,
                type
            }
        })
    }
    /* 获取期刊点赞的信息 */
    getLikeStatus(type,id,callback){
        this.request({
            url:`/classic/${type}/${id}/favor`,
            success:res=>{
                callback(res);
            }
        })
    }
}
export {LikeModel}