import React from 'react';
import { DatePicker, Spin, Table, Alert, Pagination, Skeleton } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import SearchForm from './search';
import statisticsApi from '../../api/statistics';
import styles from './style.less';

export default class StatisticsDay extends React.Component {
    state = {
        info: {},
        list: [],
        total: 0,
        pageSize: 10,
        loading: false
    }
    componentDidMount() {
        

        // console.log(moment(new Date()-30).format('YYYY/MM/DD'))
        this.getData();
    }
    getData(query = {}) {
        this.setState({
            loading: true
        })
        statisticsApi.daily(query).then(res => {
            let data = res.list.map((item, index) => {
                item.key = index;
                return item;
            })
            this.setState({
                info: res.all,
                list: data,
                loading: false,
                total: res.total,
                pageSize: res.pagesize
            })
        })
    }

    handleSearch(val) {
        if (val.length == 0) {
            this.getData();
            return;
        }
        let minDate = moment(val[0]).format('YYYY-MM-DD');
        let maxDate = moment(val[1]).format('YYYY-MM-DD');
        this.getData({ minDate, maxDate});
    }
    linkView(record) {
        router.push({
            pathname: '/statistics/dayview',
            query: {
                time: record.cdate
            }
        })
    }
    onChangeFun() {
        
    }
    render() {
        const columns = [
            { title: '日期', key: 'cdate', align: 'center', dataIndex: 'cdate' },
            { title: '订阅总额', key: 'rmoney', align: 'center', dataIndex: 'rmoney' },
            { title: '订阅收入', key: 'rate_rmoney', align: 'center', dataIndex: 'rate_rmoney' },
            { title: '包月订阅数量', key: 'mtotal', align: 'center', dataIndex: 'mtotal' },
            // { title: '广告阅读数量', key: 'atotal', dataIndex: 'atotal' },
            // { title: '广告收入', key: 'amoney', dataIndex: 'amoney' },
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
                    <SearchForm handleSearch={this.handleSearch.bind(this)}></SearchForm>
                </div>
                <div className={styles.count}>
                    <Skeleton loading={this.state.loading}>
                        <Alert type="info" message={`累计订阅金额: ${info.rmoney || 0}； 累计订阅收入: ${info.rate_rmoney || 0}；  累计包月订阅数量: ${info.mtotal || 0}`}></Alert>
                    </Skeleton>
                </div>
                <div className="myTable" >
                    <Spin spinning={this.state.loading}>
                        <Table
                            bordered
                            dataSource={this.state.list}
                            pagination={{
                                pageSize: pageSize,
                                total: total,
                                onChange:(page)=>{
                                    this.getData({page})
                                }
                            }}
                            columns={columns}>
                        </Table>
                    </Spin>
                </div>
            </div>
        )
    }
}