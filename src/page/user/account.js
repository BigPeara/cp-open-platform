import React from 'react';
import userApi from '../../api/user';
import styles from './style.less';
import { Form, Input, Button, Spin  } from 'antd';

const FormItem = Form.Item;


class accountForm extends React.Component {
    state = {
        info: {},
        loading: false
    }
    componentWillMount() {
        this.getData();
    }
    getData() {
        this.setState({
            loading: true
        })
        userApi.loginView().then(res => {
            this.setState({
                loading: false,
                info: res.data
            })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                userApi.loginEdit(values).then(res => {
                    this.getData();
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 4,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const info = this.state.info;
        return (
            <div className={styles.commonContent}>
                <Spin spinning={this.state.loading}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="CP名称"
                        >
                            {getFieldDecorator('title', {
                                initialValue: info.title
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="公司名称"
                        >
                            {getFieldDecorator('company', {
                                initialValue: info.company
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="联系人"
                        >
                            {getFieldDecorator('contact', {
                                initialValue: info.contact
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="联系电话"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{
                                    // required: true, message: '滇西电话必填!',
                                }],
                                initialValue: info.phone
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="qq"
                        >
                            {getFieldDecorator('qq', {
                                initialValue: info.qq
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">更新个人信息</Button>
                        </FormItem>
                    </Form>
                </Spin>
                
            </div>
        );
    }
}

const normalAccountForm = Form.create()(accountForm);

export default normalAccountForm;