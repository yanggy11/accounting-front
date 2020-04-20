import axios from 'axios'
import router from 'vue-router'

// 这里我是使用elementUI的组件来给提示
import { Loading, Message } from 'element-ui'

// 加载全局的loading
let loadingInstance = null;
axios.defaults.timeout =  6000;
const instance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
    timeout: 10000, // 设置超时时间10s
    baseURL: 'http://localhost:1988/accounting/'
});
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['Content-Type'] = 'application/json'

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    config.headers['token'] = sessionStorage.getItem('token') || '';
    loadingInstance = Loading.service({       // 发起请求时加载全局loading，请求失败或有响应时会关闭
        spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
        text: '拼命加载中...'
    });

    return config
}, error=> {
    // 对请求错误做些什么
    return Promise.reject(error)
});

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    loadingInstance.close()
    if (response.data.status === '1') {     // 响应结果里的status: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
        return Promise.resolve(response.data)
    } else {
        Message({
            message: response.data.message,
            type: 'error'
        });
        return Promise.reject(response.data.message)
    }
}, error => {
    loadingInstance.close();
    if (error.response) {
        // 根据请求失败的http状态码去给用户相应的提示
        let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
        Message({
            message: tips,
            type: 'error'
        });
        if (error.response.status === 401) {    // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
            router.push({
                path: `/login`
            })
        }
        return Promise.reject(error)
    } else {
        Message({
            message: '请求超时, 请刷新重试',
            type: 'error'
        })
        return Promise.reject(new Error('请求超时, 请刷新重试'))
    }
})

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

