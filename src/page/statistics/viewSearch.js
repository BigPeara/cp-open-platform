import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class NormalSearchForm extends React.Component {
    state = {
        mode: ['month', 'month'],
        value: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSearch(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit} className="search-form">
                <FormItem>
                    {getFieldDecorator('bid')(
                        <Input placeholder="请输入作品Id"></Input>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('title')(
                        <Input placeholder="请输入作品名称"></Input>
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