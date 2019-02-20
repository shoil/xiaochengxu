import {
    config
} from "../config";
class HTTP {
    request({url,method = "GET",data = {}}) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: config.base_api_url + url,
                data,
                method,
                header: {
                    'Content-Type': 'application/json',
                    "appkey": config.appkey
                },
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (err) {
                    reject(err)
                }
            })
        })

    }
}
export {HTTP};