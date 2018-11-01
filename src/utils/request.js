import axios from 'axios';
import qs from 'qs';
import { Modal, message } from 'antd';
import router from 'umi/router';
import Cookies from 'js-cookie';
import userApi from '@/api/user';

const url = 'http://test.open.platform.com/';
const service = axios.create({
    baseURL: url,
    timeout: 5000
})

service.interceptors.request.use(config => {
    config.url = config.url + '?debug=1'
    return config;
}, function (error) {
    return Promise.reject(error);
});
service.interceptors.response.use(res => {
    if (res && res.data && res.data.code == 405) {
        // let autoinfo = Cookies.get('autoInfo');
        // if (autoinfo == undefined || autoinfo == null || autoinfo == '') {
            router.push('/login')  
        // } else {
        //     userApi.login(JSON.parse(autoinfo)).then(res=>{
        //         window.location.reload();
        //     })
        // }
    }
    if (res && res.data && res.data.code != 200) {
        message.error(res.data.message || '系统错误');
        return Promise.reject(res);
    }
    return res;
}, function (error) {
    return Promise.reject(error);
});

export default {
    get(url, data, error) {
        return new Promise((resolve, reject) => {
            service.get(url, {
                params: data
            }).then(res => {
                resolve(res)
            })
        })
    },
    post(url, data, error) {
        return new Promise((resolve, reject) => {
            service.post(url, qs.stringify(data)).then(res => {
                resolve(res)
            },(error)=>{
                reject(error)
            })
        })
    },
    formpost(url, data, error) {
        return new Promise((resolve, reject) => {
            let formdata = new FormData();
            service.post(url, data).then(res => {
                resolve(res)
            })
        })

    },
    delete(url, data, error) {
        // let title = data.confirmTitle ? data.confirmTitle : "是否删除？"
        let title = "是否删除？"
        return new Promise((resolve, reject) => {
            Modal.confirm({
                title: '警告',
                content: title,
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    service.post(url, qs.stringify(data)).then(res => {
                        resolve(res)
                    })
                }
            })
        })
    }
}