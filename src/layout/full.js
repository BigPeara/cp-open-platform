import { Component } from 'react';
import styles from './layout.less';
import store from '../store/index';

export default class BasicLayout extends Component {
    render() {
        return (
            <div className={styles.full}>
                {this.props.children}
            </div>
        )
    }
}