import api from '../utils/request'

export default {
    index(data) { // 添加用户
        return new Promise((resolve, reject) => {
            api.get('index', data).then(res => {
                resolve(res.data.data)
            })
        })
    }
}
