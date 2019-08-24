// 请求类封装
class Api {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }


    /* 
     * ajax 请求封装  author mason  2019.05.27
     * @path 路径 
     * @data requestBody
     * @header null
     * @method 请求方法 「默认为post」
     * @dataType json
     * @success 成功回调函数
     * @fail 失败回调函数
     * @showLoading 是否显示loading 默认为不显示
     */

    ajax({ path, data, header, method, dataType, success, fail, showLoading }) {
        return new Promise((resolve, reject) => {
            // 显示loading
            if (showLoading) {
                wx.showLoading({
                    title: showLoading.msg || '加载中...',
                    mask:showLoading.mask || false
                })
            }

            // wx.request 请求
            wx.request({
                url: this.baseURL + path,
                data: data || {},
                header: header || {
                    "content-type": "application/json",
                    accessToken: wx.getStorageSync("token")   // 缓存里存的建议是token字段
                },
                method: method || "GET",
                dataType: dataType || "json",
                success: ( data ) => {
                    if (typeof success == 'function') {
                        success(data);
                        showLoading ? this.hideLoading(showLoading.endTime) : null;
                    } else {
                        resolve(data);
                        showLoading ? this.hideLoading(showLoading.endTime) : null;
                    }
                },
                fail: err => {
                    if (typeof fail == 'function') {
                        fail(err);
                        showLoading ? this.hideLoading(showLoading.endTime) : null;
                    } else {
                        reject(err);
                        showLoading ? this.hideLoading(showLoading.endTime) : null;
                    }
                    console.error(new Error(err));
                }
            });
        });
    }
    
    // 公共 wx.request 请求
    publicMethods({path, data, method = 'GET', header, dataType = 'json', success, error}) {
        wx.request({
            url: this.baseURL + path,
            data: data || {},
            header: header || {
                "content-type": "application/json",
                accessToken: wx.getStorageSync("token")   // 缓存里存的建议是token字段
            },
            method,
            dataType,
            success: ( data ) => {
                success(data);
            },
            fail: err => {
                error(err);
                console.error(new Error(err));
            }
        });
    }

    // get 方法
    get(path, data, header){
        return new Promise((resolve, reject) => {
            publicMethods({path, data, header, success: data => resolve(data), error: err => reject(err)})
        })
    }

    // post 方法
    post(path, data, header){
        return new Promise((resolve, reject) => {
            publicMethods({path, data, method:"POST", header, success: data => resolve(data), error: err => reject(err)})
        })
    }

    // put 方法
    put(path, data, header){
        return new Promise((resolve, reject) => {
            publicMethods({path, data, method:"PUT", header, success: data => resolve(data), error: err => reject(err)})
        })
    }

    // delete 方法
    delete(path, data, header){
        return new Promise((resolve, reject) => {
            publicMethods({path, data, method:"DELETE", header, success: data => resolve(data), error: err => reject(err)})
        })
    }

    hideLoading(endTime) {
        setTimeout(() => {
            wx.hideLoading();
        }, endTime || 500);
    }
};


module.exports = baseURL => new Api(baseURL);