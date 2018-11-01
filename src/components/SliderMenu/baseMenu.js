import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

let menuList = [
    {
        id: 1,
        name: '数据统计',
        icon: 'bar-chart',
        path: '/'
    },
    {
        id: 2,
        name: '财务管理',
        icon: 'pay-circle',
        path: '/bill'
    },
    {
        id: 3,
        name: '运营管理',
        icon: 'build',
        children: [
            {
                id: 4,
                name: '订阅日报',
                icon: 'file',
                path: '/statistics/day'
            },
            {
                id: 5,
                name: '订阅月报',
                icon: 'copy',
                path: '/statistics/month'
            },
        ]
    },
]

export default class BaseMenu extends React.Component{
    getKey() {
        let hash = location.hash.substr(1);
        let isCollapsed = Cookies.get('togglecollapsed') || false
        for (let i = 0; i < menuList.length; i++) {
            let item = menuList[i];
            let children = item.children;
            if (hash == item.path) {
                return {
                    parentKey: '',
                    currentKey: item.id.toString()
                }
            } else if (children && children.length > 0) {
                for (let j = 0; j < children.length; j++) {
                    if (children[j].path == hash) {
                        return {
                            parentKey: isCollapsed == 'true' ? '' : item.id.toString(),
                            currentKey: children[j].id.toString()
                        }
                    }
                }
            }
        }

        return {
            currentKey: '',
            parentKey: ''
        }
    }
    render() {
        return (
            <div>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[this.getKey().currentKey]}
                    defaultOpenKeys={[this.getKey().parentKey]}
                >
                    {
                        menuList.map(item => {
                            if (item.children && item.children.length > 0) {
                                return (
                                    <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                                        {
                                            item.children.map(childrenItem => {
                                                return (
                                                    <Menu.Item key={childrenItem.id}>
                                                        <Link to={childrenItem.path}>
                                                            <Icon type={childrenItem.icon} />
                                                            <span>{childrenItem.name}</span>
                                                        </Link>
                                                    </Menu.Item>
                                                )
                                                
                                            })
                                        }
                                    </SubMenu>
                                )
                            } else {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Link to={item.path}>
                                            <Icon type={item.icon} />
                                            <span>{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                            
                        })
                    }
                </Menu>
            </div>
        )
    }
}
