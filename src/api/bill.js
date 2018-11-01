import api from '../utils/request'


export default {
    bill(data) { // 账单列表
        return new Promise((resolve, reject) => {
            api.get('bill', data).then(res => {
                resolve(res.data.data)
            })
        })
    },

    billView(data) { // 查看账单
        return new Promise((resolve, reject) => {
            api.get('bill/view', data).then(res => {
                resolve(res.data.data)
            })
        })
    }
}
