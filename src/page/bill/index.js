import React from 'react';
import { DatePicker, Spin, Table, Modal } from 'antd';
const { MonthPicker } = DatePicker;
import moment from 'moment';
import router from 'umi/router';
import SearchForm from './search';
import billApi from '../../api/bill';
import styles from './style.less';
import BillView from './view';

export default class Bill extends React.Component {
    state = {
        list: [],
        loading: false,
        viewVisible: false,
        info: {},
        total: 0,
        pageSize: 10,
        time: ''
    }
    componentDidMount() {
        this.getData();
    }
    getData(query = {}) {
        this.setState({
            loading: true
        })
        billApi.bill(query).then(res => {
            let data = res.list.map((item, index) => {
                item.key = index;
                return item;
            })
            this.setState({
                list: data,
                loading: false,
                total: res.total || 0,
                pageSize: res.pagesize || 10
            })
        })
    }

    handleSearch(val) {
        if (val == undefined) {
            this.getData();
            return;
        }
        this.getData({ time: moment(val).format('YYYY-MM')});
    }
    linkView(record) {
        billApi.billView({ time: record.cmonth }).then(res => {
            this.setState({
                time: record.cmonth,
                info: res,
                viewVisible: true
            })
        })
    }
    handleCancel() {
        this.setState({
            viewVisible: false
        })
    }
    render() {
        const columns = [
            { title: '日期', key: 'cmonth',align: 'center', dataIndex: 'cmonth' },
            { title: '订阅收入', key: 'rate_rmoney', align: 'center', dataIndex: 'rate_rmoney' },
            { title: '包月订阅收入', key: 'mmoney', align: 'center', dataIndex: 'mmoney' },
            // { title: '广告收入', key: 'amoney', align: 'center', dataIndex: 'amoney' },
            { title: '总收入', key: 'tmoney', align: 'center',dataIndex: 'tmoney' },
            {
                title: '操作', dataIndex: 'action', key: 'action', align: 'center', render: (text,record) => (
                <div>
                    <a href="javascript:;" onClick={this.linkView.bind(this, record)}>查看账单</a>   
                </div>  
            )}
        ]
        const total = this.state.total;
        const pageSize = this.state.pageSize;
        return (
            <div className={styles.searchIndex}>
                <div className={styles.search}>
                    <SearchForm handleSearch={this.handleSearch.bind(this)}></SearchForm>
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
                                onChange: (page) => {
                                    this.getData({ page })
                                }
                            }}>
                        </Table>
                    </Spin>
                </div>

                <Modal
                    title="Basic Modal"
                    visible={this.state.viewVisible}
                    title="账单"
                    width = "610px"
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div>
                        <BillView onCancel={this.handleCancel.bind(this)} time={this.state.time} initData={this.state.info}></BillView>
                    </div>
                    
                </Modal>
            </div>
        )
    }
}