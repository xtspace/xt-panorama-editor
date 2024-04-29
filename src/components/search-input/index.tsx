
import { Button, Form, Input } from 'antd';

interface ISearchInputProps {
    onFinish: (val: { keyword: string }) => void
}

export default function SearchInput(props: ISearchInputProps) {
    const { onFinish } = props

    return <>
        <Form layout="inline" onFinish={onFinish}>
            <Form.Item
                name="keyword"
            >
                <Input placeholder="请输入关键字" allowClear />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    搜索
                </Button>
            </Form.Item>
        </Form>
    </>
}
