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
}
export {LikeModel}