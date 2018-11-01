import React from 'react';
import { DatePicker, Spin, Table, Alert, Skeleton  } from 'antd';
const { MonthPicker } = DatePicker;
import moment from 'moment';
import router from 'umi/router';
import SearchForm from './search';
import statisticsApi from '../../api/statistics';
import styles from './style.less';

export default class StatisticsMonth extends React.Component {
    state = {
        list: [],
        info: {},
        total: 0,
        pageSize: 10,
        loading: false
    }
    componentDidMount() {
        this.getData();
    }
    getData(query = {}) {
        this.setState({
            loading: true
        })
        statisticsApi.monthly(query).then(res => {
            let data = res.list.map((item, index) => {
                item.key = index;
                return item;
            })
            this.setState({
                list: data,
                info: res.all,
                total: res.total,
                pageSize: res.pagesize,
                loading: false
            })
        })
    }

    handleSearch(val) {
        if (val.length == 0) {
            this.getData();
            return;
        }
        let minMonth = moment(val[0]).format('YYYY-MM');
        let maxMonth = moment(val[1]).format('YYYY-MM');
        this.getData({ minMonth, maxMonth });
    }
    linkView(record) {
        router.push({
            pathname: '/statistics/monthview',
            query: {
                time: record.cmonth
            }
        })
    }
    render() {
        const columns = [
            { title: '日期', key: 'cmonth', align: 'center', dataIndex: 'cmonth' },
            { title: '订阅总额', key: 'rmoney', align: 'center', dataIndex: 'rmoney' },
            { title: '订阅收入', key: 'rate_rmoney', align: 'center', dataIndex: 'rate_rmoney' },
            { title: '包月订阅数量', key: 'mtotal', align: 'center', dataIndex: 'mtotal' },
            // { title: '广告阅读数量', key: 'atotal', dataIndex: 'vatotal' },
            // { title: '广告收入', key: 'vamoney', dataIndex: 'vamoney' },
            {
                title: '操作', dataIndex: 'action', key: 'action', align: 'center', render: (text, record) => (
                    <div>
                        <a href="javascript:;" onClick={this.linkView.bind(this, record)}>作品明细</a>
                    </div>
                )
            }
        ];
        const info = this.state.info;
        const total = this.state.total;
        const pageSize = this.state.pageSize;
        return (
            <div className={styles.commonContent}>
                <div className={styles.search}>
                    <SearchForm handleSearch={this.handleSearch.bind(this)} type="month"></SearchForm>
                </div>
                <div className={styles.count}>
                    <Skeleton loading={this.state.loading}>
                        <Alert type="info" message={`累计订阅金额: ${info.rmoney || 0}； 累计订阅收入: ${info.rate_rmoney || 0}；  累计包月订阅数量: ${info.rtotal || 0}； 累计包月订阅收入: ${info.mmoney || 0} `}></Alert>
                    </Skeleton>
                </div>
                <div className="myTable" >
                    <Spin spinning={this.state.loading}>
                        <Table
                            bordered
                            dataSource={this.state.list}
                            columns={columns}
                            pagination={{
                                pageSize: pageSize,
                                total: total,
                                onChange:(page)=>{
                                    this.getData({page})
                                }
                            }}
                            >
                        </Table>
                    </Spin>
                </div>
            </div>
        )
    }
}