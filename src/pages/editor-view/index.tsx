import { useContext, useEffect, useImperativeHandle } from 'react';
import { Col, Row, Form, Slider, InputNumber } from 'antd';
import { Context } from '@/pages/editor/context'
import { produce } from 'immer';


interface IViewProps {
    fov: number
    hlookAt: number
    vlookAt: number
}

export default function EditorView() {
    const [form] = Form.useForm<IViewProps>();
    const { curPano, panoData, viewRef, krpanoRef, setPanoData } = useContext(Context);
    const krpano = krpanoRef.current?.getInstance();

    const scene = panoData?.scenes?.find(d => d.id === curPano?.id) || panoData?.scenes[0];

    useEffect(() => {
        scene && form.setFieldsValue({
            fov: scene.view.fov,
            hlookAt: scene.view.hlookAt,
            vlookAt: scene.view.vlookAt
        })
    }, [scene])


    useImperativeHandle(viewRef, () => {
        return {
            editorScene: (params: IViewProps) => {
                onValuesChange(params)
            }
        }
    })

    const onValuesChange = (value: IViewProps) => {
        krpano.editorScene(value);

        setPanoData?.(produce(panoData, draft => {
            draft?.scenes?.forEach(d => {
                if (d.id === scene?.id) {
                    Object.assign(d.view, value)
                }
            })
        }))
    }


    return scene && <Form
        name="basic"
        form={form}
        layout="vertical"
        onValuesChange={onValuesChange}
    >
        <Form.Item
            label="视角（FOV）"
            name="fov"
        >
            <Row>
                <Col span={15}>
                    <Form.Item name="fov">
                        <Slider max={180} min={0} />
                    </Form.Item>
                </Col>
                <Col span={4} offset={1}>
                    <Form.Item name="fov">
                        <InputNumber max={180} min={0} />
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
        <Form.Item
            label="水平视角"
            name="hlookAt"
        >
            <Row>
                <Col span={15}>
                    <Form.Item name="hlookAt">
                        <Slider max={360} min={-360} />
                    </Form.Item>
                </Col>
                <Col span={4} offset={1}>
                    <Form.Item name="hlookAt">
                        <InputNumber max={360} min={-360} />
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
        <Form.Item
            label="垂直视角"
            name="vlookAt"
        >
            <Row>
                <Col span={15}>
                    <Form.Item name="vlookAt">
                        <Slider max={90} min={-90} />
                    </Form.Item>
                </Col>
                <Col span={4} offset={1}>
                    <Form.Item name="vlookAt">
                        <InputNumber max={90} min={-90} />
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
    </Form >
}