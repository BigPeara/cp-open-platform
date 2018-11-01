import React from 'react';

import { Form, DatePicker, Button } from 'antd';

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

class NormalSearchForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSearch(values.month || undefined);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit} className="search-form">
                <FormItem>
                    {getFieldDecorator('month')(
                        <MonthPicker format="YYYY-MM" placeholder="请选择日期" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">搜索</Button>
                </FormItem>
            </Form>
        );
    }
}

const searhForm = Form.create()(NormalSearchForm);

export default searhForm;