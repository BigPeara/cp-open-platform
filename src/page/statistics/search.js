import React from 'react';
import { Form, DatePicker, Button } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class NormalSearchForm extends React.Component {
    constructor(props) {
        super(props);
        let date = this.getInitDate();
        this.state = {
            mode: ['month', 'month'],
            value: [],
            date: [moment(date.last, 'YYYY/MM/DD'), moment(date.current, 'YYYY/MM/DD')]
        };
    }
    componentDidMount() {

        this.getInitMode();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSearch(this.state.value);
            }
        });
    }
    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            mode: [
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1],
            ],
        });
    }
    handleDateChange = (value) => {
        let originDate = this.state.date;
        this.setState({
            value,
            date: [value[0] || originDate[0], value[1] || originDate[1]],
        });
    }
    getInitDate() {
        let current = moment(new Date()).subtract(1, 'days').format('YYYY/MM/DD');
        let last = moment(new Date()).subtract(1, 'months').subtract(1, 'days').format('YYYY/MM/DD');
        return { current, last };
    }
    getInitMode() {
        let current = moment(new Date()).subtract(1, 'months').format('YYYY/MM');
        let last = new Date().getFullYear() + '/01';
        if (new Date().getMonth() == 0) {
            current = last;
        }
        this.setState({
            value: [
                moment(last, 'YYYY/MM/DD'),
                moment(current, 'YYYY/MM/DD'),
            ],
        });
    }
    render() {
        const { value, mode } = this.state;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit} className="search-form">
                <FormItem>
                    {
                        this.props.type == 'month' ? (
                            <div>
                                <RangePicker format="YYYY-MM"
                                    placeholder={['开始月份', '结束月份']}
                                    value={value}
                                    mode={mode}
                                    onPanelChange={this.handlePanelChange} />
                            </div>) : (
                                <div>
                                    {/* {getFieldDecorator('date')( */}
                                    <RangePicker
                                        format="YYYY-MM-DD "
                                        value={this.state.date}
                                        placeholder={['开始日期', '结束日期']} onCalendarChange={this.handleDateChange.bind(this)}/>
                                    {/* )} */}
                                </div>
                            )
                    }

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