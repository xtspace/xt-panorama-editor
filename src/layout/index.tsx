
import { Outlet, useNavigate } from "react-router-dom";
import Menu from './menu';
import { Avatar, type MenuProps, Dropdown, Layout } from 'antd';
import s from './index.module.less'
import logo from '@/assets/logo.png'
import { Header } from "antd/es/layout/layout";
import { removeStorage } from "@/utils/storage";
import { STORAGE } from "@/enum/storage";
import { UserOutlined } from "@ant-design/icons";
import { getStorage } from '@/utils/storage';
import { AliveScope } from 'react-activation';


const { Content, Sider } = Layout;


const items: MenuProps['items'] = [
    {
        key: "logout",
        label: "退出登录",
    }
]

export default function BasicLayout() {
    const navigate = useNavigate()

    const username = getStorage('USER_NAME')
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === "logout") {
            removeStorage(STORAGE.TOKEN)
            navigate("/", { replace: true })
        }
    }


    return <Layout className={s["layout"]}>
        <AliveScope>
            <Layout>
                <Sider width={200}>
                    <div className='flex-center'>
                        <img src={logo} />
                        <p>全景编辑器</p>
                    </div>
                    <Menu />
                </Sider>
                <Layout>
                    <Header className="flex flex-justify-end flex-content-center" style={{
                        background: "#fff"
                    }} >
                        <div>
                            <Dropdown menu={{ items, onClick }} >
                                <div>
                                    <Avatar size={34} icon={<UserOutlined />} />
                                    <span className="ml-10">{ username }</span>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            padding: 16,
                            margin: 16,
                            borderRadius: 4,
                            background: "#fff",
                            maxHeight: "97vh"
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </AliveScope>
    </Layout>
}