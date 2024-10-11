import { Button, Col, Form, Input, Row, message } from 'antd'
import logo from '@/assets/logo.png'
import s from './index.module.less'
import { useBoolean } from 'ahooks';
import { login, register } from '@/api/login';
import { CodeEnum } from '@/enum/code';
import { getStorage, setStorage } from '@/utils/storage';
import { STORAGE } from '@/enum/storage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfoApi } from '@/api/user';
import { encrypt } from "@/utils/crypto";
import Vcode from 'react-vcode';

type FormValues = {
    username: string;
    password: string;
}


export default function Login() {
    const [isRegister, { toggle, setFalse }] = useBoolean(false);

    const [captcha, setCaptcha] = useState<string>('');

    const navigate = useNavigate()



    useEffect(() => {
        getStorage(STORAGE.TOKEN) && navigate("/tour");
    }, []);


    const handleClick = (e: string | null) => {
        e && setCaptcha(e);
    };



    const onFinish = async (values: FormValues) => {
        const paramsData = {
            ...values,
            password: encrypt(values.password, 'password')
        }
        if (isRegister) {
            const res = await register(paramsData)
            res?.data.code === CodeEnum.SUCCESS ? setFalse() : message.info(res?.data?.message)
        } else {
            const res = await login(paramsData)
            if (res.data.code === CodeEnum.SUCCESS) {
                setStorage(STORAGE.TOKEN, res?.data?.result?.token)
                setStorage('USER_NAME', res?.data?.result?.username)
                const resInfo = await getUserInfoApi()
                navigate('/tour', { replace: true })
                if (res.data.code === CodeEnum.SUCCESS) setStorage('USER_ROLE', resInfo?.data?.result?.roleKey)
            } else {
                message.info(res?.data?.message)
            }
        }
    };



    return <div className={s.login}>
        <div className={s["login-form"]}>
            <Row className='w-500'>
                <Col span={16} offset={8}>
                    <div className='flex-center'>
                        <img src={logo} width="50" height="50" alt="" />
                        <p className='text-center font-800 font-size-28'>全景编辑器</p>
                    </div>
                </Col>
            </Row>
            <Form
                variant="filled"
                style={{ maxWidth: 500 }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    className='mb-30'
                    rules={[{ required: true, message: '请输入用户名', max: 20 }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={
                        isRegister ? [
                            { required: true, message: '请输入密码' },
                            {
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                                message: '密码需包含大写字母,小写字母,数字'
                            }
                        ] : [{ required: true, message: '请输入密码' },]
                    }
                >
                    <Input.Password />
                </Form.Item>
                {
                    isRegister && <>
                        <Form.Item
                            label="手机号"
                            name="telephone"
                            className='mb-30'
                            rules={[
                                { required: true, message: '请输入手机号' },
                                {
                                    pattern: /^1[3456789]\d{9}$/,
                                    message: '请输入正确的手机号'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="验证码"
                            name="captcha"
                            className='mb-30'
                            rules={[
                                { required: true, message: '请输入验证码' },
                                {
                                    validator: async (_, value) => {
                                        if (value !== captcha) return Promise.reject(new Error('验证码不正确，请重新输入!'));
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Row>
                                <Col span={14}><Input /></Col>
                                <Col span={8} offset={2}>
                                    <Vcode height={30} width={100} onChange={(v) => { handleClick(v) }} />
                                </Col>
                            </Row>
                        </Form.Item>
                    </>
                }
                
                <Form>
                    {/* <Form.Item
                        wrapperCol={{ offset: 8 }}
                    >
                        <Button type="link" className='pl-0' htmlType="button" onClick={toggle}>
                            {!isRegister ? "没有账号?立即注册" : "已有账号?立即登录"}
                        </Button>
                    </Form.Item> */}
                </Form>
                <Form.Item wrapperCol={{ offset: 8 }}>
                    <Button className='w-full' type="primary" htmlType="submit">
                        {isRegister ? "注册" : "登录"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}