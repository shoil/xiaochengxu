import {HTTP} from "../utils/http-p";
class BookModel extends HTTP{
    getHotBook(){
       return this.request({
            url:"/book/hot_list"
        })
    }
    getBookDetail(id){
        return this.request({
            url:`/book/${id}/detail`
        })
    }
    getBookComment(id){
        return this.request({
            url:`/book/${id}/short_comment`
        })
    }
    getBookLike(id){
        return this.request({
            url:`/book/${id}/favor`
        })
    }
    /* 新增短评 */
    addNewComment(id,content){
        return this.request({
            url:`/book/add/short_comment`,
            method:"POST",
            data:{
                book_id:id,
                content
            }
        })
    }
}
export {BookModel};