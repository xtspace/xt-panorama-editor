import { PlusOutlined } from '@ant-design/icons';
import { Button, Table, Input, Modal, Form, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import useManagementUser from '@/hooks/useManagementUser'
import { deleteUserApi, getRoleListApi, setUserInfoApi, addUserInfoApi, UserData, RoleData } from '@/api/user';
import { CodeEnum } from '@/enum/code';
import { encrypt } from "@/utils/crypto";

interface UserInfo {
  id: string
  username: string
}
export default function UserManagement() {
    const [form] = Form.useForm()
    const [tableData, requestParams, setRequestParams] = useManagementUser()
    const [isEditUser, setIsEditUser] = useState<boolean>(false)
    const [modelTitle, setModelTitle] = useState<string>('')
    const [roleOptions, setRoleOptions] = useState<RoleData['result']>([])
    const [editUser, setEditUser] = useState<UserInfo>()
    const [confirmModal, setConfirmModal] = useState<boolean>(false)

    const operaUser = () => {
      form.validateFields().then(async () => {
        const paramData = { 
          ...form.getFieldsValue(),
          roleIds: [form.getFieldValue('roleId')],
          password: form.getFieldValue('password') === '' ? undefined : encrypt(form.getFieldValue('password'), 'password'),
          id: modelTitle !== '新增' ? editUser?.id : undefined
        }
        const res = modelTitle === '新增' ? await addUserInfoApi(paramData) : await setUserInfoApi(paramData)
        if (res.data.code === CodeEnum.SUCCESS) {
          message.success(`${modelTitle === '新增' ? '添加' : '修改'}成功`)
          setRequestParams(requestParams)
        }
        setIsEditUser(false)
      })
    }

    const initRoleOption = async () => {
      const res = await getRoleListApi()
      if (res.data.code !== CodeEnum.SUCCESS) return
      setRoleOptions(res.data.result)
    }

    const deleteUser = async () => {
      if (!editUser?.id) return
      const res = await deleteUserApi(editUser?.id)
      if (res.data.code !== CodeEnum.SUCCESS) return message.error("删除失败")
      setRequestParams(requestParams)
      setConfirmModal(false)
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 5 },
      },
    };

    useEffect(() => {
      initRoleOption()
    }, [])

    return <>
        <div className='flex justify-between'>
            <div className='flex items-center'>
              <span>角色：</span>
              <Select
                fieldNames={{
                  label: 'roleName',
                  value: "id",
                }}
                className='w-10vw'
                allowClear={true}
                options={roleOptions}
                onChange={(val) => {
                  setRequestParams({ current: 1, roleId: val })
                }}
                onClear={() => {
                  setRequestParams({ current: 1, roleId: undefined })
                }}
              />
            </div>
            <div>
                <Button type='primary' onClick={() => {
                  setIsEditUser(true)
                  setModelTitle('新增')
                }}>
                    <PlusOutlined />新增
                </Button>
            </div>
        </div>

        <Table
            rowKey="id"
            className='mt-20'
            columns={[
                {
                    title: '账号名称',
                    dataIndex: 'username'
                },
                {
                    title: '角色',
                    dataIndex: 'roleName',
                    render: (_: string, record: UserData["records"][0]) => (
                      <span>{record.roleKeyList[0] === '1' ? '超级管理员' : '普通用户'}</span>
                    ),
                },
                {
                  title: '手机号',
                  dataIndex: 'telephone'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    defaultSortOrder: 'ascend',
                    showSorterTooltip: false,
                    sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
                },
                {
                    title: '操作',
                    render: (_: string, record: UserData["records"][0]) => (
                      record.username !== 'admin' &&
                        <>
                            <a className='ml-10 cursor-pointer' onClick={() => {
                              const roleId = roleOptions.filter((optionItem: any) => optionItem.id === record.roleKeyList[0])[0].id
                              form.setFieldsValue({ ...record, password: '', roleId: roleId })
                              setIsEditUser(true)
                              setModelTitle('编辑')
                              setEditUser(record)
                            }}>编辑</a>
                            <a className='ml-10 cursor-pointer' onClick={() => {
                              setConfirmModal(true)
                              setEditUser(record)
                            }}>删除</a>
                        </>
                    ),
                },
            ]}
            dataSource={tableData.list}
            pagination={{
                pageSize: requestParams.size,
                current: requestParams.current,
                total: tableData?.total,
                onChange: (current, size) => {
                    setRequestParams({ current, size })
                }
            }}
            locale={{emptyText: '暂无数据'}}
        />

        <Modal
          title={modelTitle}
          okText="确定"
          cancelText="取消"
          open={isEditUser}
          onOk={() => { operaUser() }}
          afterClose={() => form.resetFields()}
          onCancel={() => setIsEditUser(false)}
        >
            <Form
              {...formItemLayout}
              form={form}
              className='mt-20'
            >
                <Form.Item
                  label="账号名称"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请填写账号名称!',
                    }
                  ]}
                >
                    <Input placeholder='请输入账号名称' autoComplete="new-username" />
                </Form.Item>
                <Form.Item
                  label="账号密码"
                  name="password"
                  rules={[
                    {required: modelTitle === '新增',message: '请填写账号密码!'},
                    {pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,message:'密码需包含大写字母,小写字母,数字'},
                    {min:6,message:"长度不得小于6位"},
                  ]}
                >
                    <Input.Password placeholder='请填写账号密码，密码要包含大写字母,小写字母,数字' autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                  label="确认密码"
                  dependencies={['password']}
                  name="confirm"
                  rules={[
                    {
                      required: modelTitle === '新增',
                      message: '请填写账号密码!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码不相等!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='密码要与账号密码保持一致' />
                </Form.Item>
                <Form.Item
                  label="手机号"
                  name="telephone"
                  rules={[
                      { required: true, message: '请输入手机号' },
                      {
                          pattern: /^1[3456789]\d{9}$/,
                          message: '请输入正确的手机号'
                      }
                  ]}
                >
                    <Input placeholder='请输入手机号' autoComplete="new-username" />
                </Form.Item>
                <Form.Item
                  label="账号角色"
                  name="roleId"
                  rules={[
                    {
                      required: true,
                      message: '请选择账号角色!',
                    }
                  ]}
                >
                    <Select
                      fieldNames={{
                        label: 'roleName',
                        value: "id",
                      }}
                      options={roleOptions}
                    />
                </Form.Item>
            </Form>
        </Modal>
        <Modal title="确认删除" open={confirmModal} onOk={deleteUser} onCancel={() => setConfirmModal(false)} okText="确认" cancelText="取消">
          <p>确定要删除用户{editUser?.username}吗？</p>
        </Modal>
    </>
}
