import React from 'react';
import styles  from './index.less';
import BaseMenu from './baseMenu'
import store from '../../store/index'
export default class SliderMenueader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoSrc: require('../../assets/logo.png'),
            logoAlt: 'cp amind',
            collapsed: store.getState(),
        }
    }
    componentDidMount() {
        store.subscribe(() =>
            this.setState({
                collapsed: store.getState()
            })
        );
    }
    
    render(){
        return (
            <div className={styles.lcSliderMenu}>
                <div className={styles.lcLogo}>
                    <img src={this.state.logoSrc} />
                    {
                        this.state.collapsed ? (
                            ''
                        ): (
                            <h1>CP OPEN ADMIN</h1>
                        )
                    }
                </div>
                <BaseMenu />
            </div>
        )
    }
}