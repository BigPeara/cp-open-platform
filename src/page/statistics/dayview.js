import React from 'react';
import { DatePicker, Spin, Table} from 'antd';
import moment from 'moment';
import router from 'umi/router';
import statisticsApi from '../../api/statistics';
import styles from './style.less';
import SearchForm from './viewSearch';

export default class StatisticsMonth extends React.Component {
    state = {
        list: [],
        total: 0,
        pageSize: 10,
        loading: false,
        now_page: 1
    }
    componentDidMount() {
        this.getData();
    }
    getData(query = {}) {
        this.setState({
            loading: true
        })
        var time = this.props.location.query.time
        query = Object.assign(query, { time });
        statisticsApi.dayDetail(query).then(res => {
            if (res.length == 0 || res == undefined) {
                this.setState({
                    list: [],
                    loading: false
                })
                return;
            }
            let data = res.list.map((item, index) => {
                item.key = index;
                return item;
            })
            this.setState({
                list: data,
                loading: false,
                total: res.total,
                now_page: res.now_page,
                pageSize: res.pagesize,
            })
        })
    }
    resetPage() {
        this.setState({
            now_page: 1
        })
    }
    handleSearch(val) {
        this.resetPage();
        if (val.length == 0) {
            this.getData();
            return;
        }
        this.getData(val);
    }
    linkView(record) {
        router.push({
            pathname: '/bill/view',
            query: {
                time: record.cmonth
            }
        })
    }
    render() {
        const columns = [
            { title: '日期', key: 'cdate', align: 'center', dataIndex: 'cdate' },
            {
                title: '作品名称（ID）', key: 'title', align: 'center', dataIndex: 'title', render: (text, record) => (
                    <div>
                        {record.title}（{record.id}）
                    </div>
                )},
            { title: '订阅总额', key: 'money', align: 'center', dataIndex: 'money' },
            { title: '订阅收入', key: 'rate_money', align: 'center', dataIndex: 'rate_money' },
            { title: '包月订购数量', key: 'mtotal', align: 'center', dataIndex: 'mtotal' },
        ];
        const total = this.state.total;
        const pageSize = this.state.pageSize;
        const page = parseInt(this.state.now_page);
        return (
            <div className={styles.commonContent}>
                <div className={styles.search}>
                    <SearchForm handleSearch={this.handleSearch.bind(this)} type="month"></SearchForm>
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
                                current: page,
                                onChange:(page)=>{
                                    this.getData({page})
                                }
                            }}>
                        </Table>
                    </Spin>
                </div>
            </div>
        )
    }
}