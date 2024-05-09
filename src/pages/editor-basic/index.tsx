import { Form, Input, Button } from 'antd';
import { Context } from '@/pages/editor/context'
import { useContext, useEffect } from 'react';
import { produce } from 'immer';
import { panoStore } from '@/utils/pano-store';
import { delay } from 'lodash-es';

const { TextArea } = Input


export default function EditorBasic() {
    const { panoData, setPanoData } = useContext(Context);
    const [form] = Form.useForm()

    const onFinish = (values: { title: string, profile: string }) => {
        setPanoData?.(produce(panoData, draft => {
            if (!draft) return
            draft.title = values.title
            draft.profile = values.profile
        }))
    }

    useEffect(() => {
        delay(() => {
            form.setFieldsValue({
                profile: panoStore.getSnapshot()?.profile,
                title: panoStore.getSnapshot()?.title
            })
        }, 0)
    }, [panoStore.getSnapshot()])


    return panoData && <Form
        form={form}
        name="basic"
        initialValues={{
            profile: panoData?.profile,
            title: panoData?.title
        }}
        onFinish={onFinish}
    >
        <Form.Item
            label="全景名称"
            name="title"
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="全景简介"
            name="profile"
        >
            <TextArea maxLength={10000} rows={15} showCount />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
            <Button className='mt-10' type="primary" htmlType="submit">
                完成设置
            </Button>
        </Form.Item>
    </Form>
}