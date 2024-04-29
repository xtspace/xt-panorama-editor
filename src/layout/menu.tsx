
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { getStorage } from '@/utils/storage';


const menus: MenuProps['items'] = [
    {
        key: 'tour',
        label: <Link to="/tour">作品管理</Link>,
    },
    {
        key: 'media',
        label: '素材管理',
        children: [
            {
                key: '/panorama',
                label: <Link to="/tour/panorama">全景</Link>,
            },
            {
                key: '/picture',
                label: <Link to="/tour/picture">图片</Link>,
            },
            {
                key: '/video',
                label: <Link to="/tour/video">视频</Link>,
            },
            {
                key: '/audio',
                label: <Link to="/tour/audio">音频</Link>,
            }
        ]
    },
]

const filterMenus = () => {
    if (getStorage('USER_ROLE')?.includes('admin') && !menus.find(menuItem => menuItem?.key === 'user')) {
        menus.push({
            key: 'user',
            label: <Link to="/tour/user">用户管理</Link>,
        })
    } else if (!getStorage('USER_ROLE')?.includes('admin') && menus.find(menuItem => menuItem?.key === 'user')) {
        return menus.filter(menuItem => menuItem?.key !== 'user')
    }
    return menus
}

export default function BasicMenu() {
    const location = useLocation()

    return <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname.replace("/tour", "") || "tour"]}
        defaultOpenKeys={['product', 'media']}
        style={{ height: '100vh' }}
        items={filterMenus()}
    />
}