import {HTTP} from "../utils/http-p";
class Keyword extends HTTP {
    getHistory() {
        const words = wx.getStorageSync('q');
        if (words) {
            return words
        } else {
            return [];
        }
    }
    addHistory(value) {
        var words = this.getHistory();
        const has = words.includes(value);
        if (value && !has) {
            if(words.length>4){
                words.pop()
            }
            words.unshift(value);
            wx.setStorageSync('q', words);
        }
    }
    getHotData(){
        return this.request({
            url:`/book/hot_keyword`
        })
    }
    getKeyword(start,value){
        return this.request({
            url:`/book/search`,
            data:{
                start,
                q:value
            }
        })
    }
}
export {
    Keyword
};