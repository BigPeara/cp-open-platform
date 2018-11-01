import React from 'react';
import { Skeleton, Divider, Button } from 'antd';
import router from 'umi/router';
import jsPDF from 'jspdf';
import html2Canvas from 'html2canvas';
import billApi from '../../api/bill';
import styles from './style.less';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

export default class Bill extends React.Component {
    state = {
        company: {},
        money: {},
        loading: false
    }
    savePdf(){
        var dom = document.getElementById('saveInfo')
        html2Canvas(dom,{scale:2}).then((canvas)=> {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
            var pageHeight = contentWidth / 592.28 * 841.89;
            var leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 595.28 / contentWidth * contentHeight;

            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            var pdf = new jsPDF('', 'pt', 'a4');

            //放大会清晰一点
            pdf.internal.scaleFactor = 1.5;
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 20, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position + 20, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save(`${this.props.initData.company.company1}发票信息.pdf`);
        });
    }
    cancel() {
        this.props.onCancel();
    }
    render() {
        const company = this.props.initData.company;
        const money = this.props.initData.money;
        const time = this.props.time;
        if (time == undefined) {
            router.push('/bill')
        }
        const timeArr = time.split('-')
        const year = timeArr[0];
        const month = timeArr[1];
        return (
            <div className={styles.billView}>
                <Skeleton loading={this.state.loading} rows="20">
                    <div className={styles.viewConetnt}>
                        <div className={styles.saveContent} id="saveInfo">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan="6">
                                            {company.company1}<span>{year}年{month}月对账单</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="1">公司名称</td>
                                        <td colSpan="2">{company.company1}</td>
                                        <td colSpan="1">单据编号</td>
                                        <td colSpan="2">{money.billno}</td>
                                    </tr>
                                    <tr>
                                        <td>合作项目</td>
                                        <td colSpan="5">{company.project || '未知'}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="1">联系人</td>
                                        <td colSpan="2">{company.contact}</td>
                                        <td colSpan="1">电话</td>
                                        <td colSpan="2">{company.phone}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="6" className={styles.tdBg}>结算信息</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2" colSpan="1">结算详细信息</td>
                                        <td rowSpan="1" colSpan="1">结算月份</td>
                                        <td rowSpan="1" colSpan="1">订阅收入</td>
                                        <td rowSpan="1" colSpan="1">包月订阅收入</td>
                                        <td rowSpan="1" colSpan="1">广告收入</td>
                                        <td rowSpan="1" colSpan="1">收入总额</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="1" colSpan="1">{month}</td>
                                        <td rowSpan="1" colSpan="1">{money.rate_rmoney}</td>
                                        <td rowSpan="1" colSpan="1">{money.mmoney}</td>
                                        <td rowSpan="1" colSpan="1">{money.amoney}</td>
                                        <td rowSpan="1" colSpan="1">{money.tmoney}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="1" colSpan="1">收款公司名称</td>
                                        <td rowSpan="1" colSpan="2">{company.in_company}</td>
                                        <td rowSpan="1" colSpan="1">开户银行</td>
                                        <td rowSpan="1" colSpan="2">{company.bank1}</td>
                                    </tr>
                                    <tr>
                                        <td>收款账号</td>
                                        <td colSpan="5">{company.bank_card1}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="6" className={styles.tdBg}>开票信息</td>
                                    </tr>
                                    <tr>
                                        <td>公司名称</td>
                                        <td colSpan="5">{company.company}</td>
                                    </tr>
                                    <tr>
                                        <td>注册地址</td>
                                        <td colSpan="5">{company.address}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="1" colSpan="1">工商登记号</td>
                                        <td rowSpan="1" colSpan="2">{company.brn}</td>
                                        <td rowSpan="1" colSpan="1">开票要求</td>
                                        <td rowSpan="1" colSpan="2">{company.invoices}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="1" colSpan="1">开户银行</td>
                                        <td rowSpan="1" colSpan="2">{company.bank}</td>
                                        <td rowSpan="1" colSpan="1">开户账号</td>
                                        <td rowSpan="1" colSpan="2">{company.bank_card}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="1" colSpan="1">财务联系人</td>
                                        <td rowSpan="1" colSpan="2">{company.finance}</td>
                                        <td rowSpan="1" colSpan="1">联系电话</td>
                                        <td rowSpan="1" colSpan="2">{company.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>邮寄地址</td>
                                        <td colSpan="5">{company.post_addr}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="1" colSpan="1">发票收件人</td>
                                        <td rowSpan="1" colSpan="2">{company.recipients}</td>
                                        <td rowSpan="1" colSpan="1">联系电话</td>
                                        <td rowSpan="1" colSpan="2">{company.rphone}</td>
                                    </tr>
                                    <tr>
                                        <td>备注</td>
                                        <td colSpan="5">{company.mark}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.viewFooter}>
                        <Button onClick={this.cancel.bind(this)}>关闭</Button>
                        <Button type="primary" icon="cloud-download" style={{marginLeft:'10px'}} onClick={this.savePdf.bind(this)}>保存到桌面</Button>
                        <span className={styles.viewFooterSpan}>点击保存PDF到桌面</span>
                    </div>
                </Skeleton>
            </div>
        )
    }
}