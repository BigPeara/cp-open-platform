import React from 'react';
import userApi from '../../api/user';
import styles from './style.less';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import router from 'umi/router';
import Cookies from 'js-cookie';

const FormItem = Form.Item;

class normalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        document.title = "CP OPEN ADMIN"
    }
    state = {
        logoSrc: require('../../assets/logo.png'),
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                userApi.login(values).then(res => {
                    router.push('/')
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.lcBgLine}>
                <div className={styles.lcFullBg}>
                    <div className={styles.login}>
                        <div className={styles.loginLeft}>

                        </div>
                        <div className={styles.loginRight}>
                            <h1>CP商户开放平台</h1>
                            <h5>CP open platform for merchants</h5>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '账号不能为空!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '密码不能为空!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                    )}
                                </FormItem>
                                {/* <div className={styles.baseForm}>
                                    {getFieldDecorator('autocheck', {
                                        
                                    })(
                                        <Checkbox>自动登录</Checkbox>
                                    )}
                                </div> */}
                                <FormItem>
                                    <div className={styles.baseFormItem}>
                                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                    </div>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const loginForm = Form.create()(normalLoginForm);

export default loginForm;


