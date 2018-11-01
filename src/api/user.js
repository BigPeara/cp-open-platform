import api from '../utils/request';
import { message } from 'antd';

export default {
    login(data) { // 登录
        return new Promise((resolve, reject) => {
            api.post('/login/index', data).then(res => {
                resolve(res.data)
            })
        })
    },
    logOut(data) {  //退出登录
        return new Promise((resolve, reject) => {
            api.post('/login/logOut', data).then(res => {
                resolve(res.data)
            })
        })
    },
    changePwd(data) {  //修改密码
        return new Promise((resolve, reject) => {
            api.post('/login/changePwd', data).then(res => {
                message.success("修改密码成功!");
                resolve(res.data)
            })
        })
    },
    loginView(data) {  //查看个人资料
        return new Promise((resolve, reject) => {
            api.post('/login/view', data).then(res => {
                resolve(res.data)
            })
        })
    },
    loginEdit(data) {  //修改个人资料
        return new Promise((resolve, reject) => {
            api.post('/login/edit', data).then(res => {
                message.success("更新资料成功!");
                resolve(res.data)
            })
        })
    }
}
