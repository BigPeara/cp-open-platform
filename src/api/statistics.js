import api from '../utils/request'

export default {
    daily(data) { // 订阅日报
        return new Promise((resolve, reject) => {
            api.get('statistics/daily', data).then(res => {
                resolve(res.data.data)
            })
        })
    },
    monthly(data) { // 订阅日报
        return new Promise((resolve, reject) => {
            api.get('statistics/monthly', data).then(res => {
                resolve(res.data.data)
            })
        })
    },
    dayDetail(data) { // 订阅日报详细
        data = Object.assign(data, { type: 1 });
        return new Promise((resolve, reject) => {
            api.get('statistics/detail', data).then(res => {
                resolve(res.data.data)
            })
        })
    },
    monthDetail(data) { // 订阅月报详细
        data = Object.assign(data, { type: 2 });
        return new Promise((resolve, reject) => {
            api.get('statistics/detail', data).then(res => {
                resolve(res.data.data)
            })
        })
    },
}
