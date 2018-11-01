import React from 'react';
import { Row, Col, Card, Skeleton } from 'antd';
import indexApi from '../../api/index';
import styles from './style.less'

export default class Home extends React.Component{
    state = {
        loading: false,
        monStatic: {},
        yesStatic: {},
        allStatic: {}
    }
    componentWillMount() {
        this.getData();
    }
    getData() {
        this.setState({
            loading: true
        })
        indexApi.index().then(res => {
            this.setState({
                yesStatic: res.yesStatic,
                monStatic: res.monStatic,
                allStatic: res.allStatic,
                loading: false
            })
            
        })
    }
    render() {
        const allStatic = this.state.allStatic;
        const monStatic = this.state.monStatic;
        const yesStatic = this.state.yesStatic;
        return (
            <div className={styles.homeIndex}>
                <Row gutter={24}>
                    {/* <Col lg={18} sm={24} style={{ marginBottom: 24 }}>
                        <Card title="汇总数据" bordered={false}>
                            <Skeleton loading={this.state.loading} rows="20">
                                <div className={styles.bigCard}>
                                    <div className={styles.bigCardP}>
                                        <div className={styles.boxStyle} style={{ background: '#67C23A' }}>
                                            <div className={styles.title}>订阅总数</div>
                                            <div className={styles.content}>{allStatic.vrtotal}</div>
                                        </div>
                                    </div>
                                    <div className={styles.bigCardP}>
                                        <div className={styles.boxStyle} style={{ background: '#E6A23C' }}>
                                            <div className={styles.title}>订阅总额</div>
                                            <div className={styles.content}>{allStatic.vrmoney}</div>
                                        </div>
                                    </div>
                                    <div className={styles.bigCardP}>
                                        <div className={styles.boxStyle} style={{ background: '#409EFF' }}>
                                            <div className={styles.title}>包月总数</div>
                                            <div className={styles.content}>{allStatic.vmtotal}</div>
                                        </div>
                                    </div>
                                    <div className={styles.bigCardP}>
                                        <div className={styles.boxStyle} style={{ background: '#F56C6C' }}>
                                            <div className={styles.title}>包月总额</div>
                                            <div className={styles.content}>{allStatic.vmmoney}</div>
                                        </div>
                                    </div>
                                </div>
                            </Skeleton>
                        </Card>
                    </Col> */}
                    <Col lg={24} sm={24}>
                        <Card title="当月数据" style={{ marginBottom: 24 }} bordered={false}>
                            <Skeleton loading={this.state.loading} rows="20">
                                <div className={styles.smallCard}>
                                    <p>
                                        <span className={styles.title}>订阅总数</span>
                                        <span className={styles.content}>{monStatic.vrtotal}</span>
                                    </p>
                                    <p>
                                        <span className={styles.title}>订阅总额</span>
                                        <span className={styles.content}>{monStatic.vrmoney}</span>
                                    </p>
                                    <p>
                                        <span className={styles.title}>包月总数</span>
                                        <span className={styles.content}>{monStatic.vmtotal}</span>
                                    </p>
                                </div>
                            </Skeleton>
                        </Card>
                        <Card
                            title="昨日数据"
                            style={{ marginBottom: 24 }}
                            bordered={false}
                        >
                            <Skeleton loading={this.state.loading} rows="20">
                                <div className={styles.smallCard}>
                                    <p>
                                        <span className={styles.title}>订阅总数</span>
                                        <span className={styles.content}>{yesStatic.vrtotal}</span>
                                    </p>
                                    <p>
                                        <span className={styles.title}>订阅总额</span>
                                        <span className={styles.content}>{yesStatic.vrmoney}</span>
                                    </p>
                                    <p>
                                        <span className={styles.title}>包月总数</span>
                                        <span className={styles.content}>{yesStatic.vmtotal}</span>
                                    </p>
                                </div>
                            </Skeleton>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}