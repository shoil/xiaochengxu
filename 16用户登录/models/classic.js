import {
    HTTP
} from "../utils/http";
class ClassicModel extends HTTP {
    getLatest(callback) {
        this.request({
            url: "/classic/latest",
            success: res => {
                let index = res.index;
                callback(res);
                wx.setStorageSync('latest', res.index)
            }
        })
    }

    getClassic(index, nextOrprevious, callback) {
        /* 有缓存则取缓存没有缓存,则发送http */
        const key = (nextOrprevious == "next") ? this._getKey(index + 1) : this._getKey(index - 1);
        const classic = wx.getStorageSync(key);
        if (classic) {
            callback(classic);
        } else {
            this.request({
                url: `/classic/${index}/${nextOrprevious}`,
                success: res => {
                    callback(res);
                    wx.setStorageSync(this._getKey(res.index), res);
                }
            })
        }

    }
    isFirst(index) {
        return index == 1 ? true : false
    }
    isLatest(index) {
        const latest = wx.getStorageSync('latest');
        return index == latest ? true : false;
    }
    _getKey(index) {
        return "classic" + index;
    }
    getFavor(callback){
        this.request({
            url:"/classic/favor",
            success:res=>{
                callback(res)
            }      
        })
    }
}
export {
    ClassicModel
};