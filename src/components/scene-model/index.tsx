import { IPanoSceneData, ISandSpot } from "@/api/pano";
import { Context } from "@/pages/editor/context";
import { Button, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import s from "./index.module.less";

interface IProps {
  spotList: ISandSpot[]
  setShowModel: (val: boolean) => void
  showScene: (id: string) => void
  curSpot: ISandSpot
}

export default function SceneModel(props: IProps) {
  const { panoData } = useContext(Context);
  const { spotList, setShowModel, showScene, curSpot } = props;
  const [selectScene, setSelectScene] = useState<{ spotId: string, sceneId: string }[]>([]);
  const [curSelect, setCurSelect] = useState<string>('');

  useEffect(() => {
    const defaultScene: { spotId: string, sceneId: string }[] = []
    spotList && spotList.map(item => {
      item.linkScene && defaultScene.push({
        spotId: item.id === curSpot.id ? curSpot.id : item.id,
        sceneId: item.id === curSpot.id && curSpot.linkScene ? curSpot.linkScene : item.linkScene
      })
    })
    setSelectScene(defaultScene)
  }, [spotList])

  const changeScene = (data: IPanoSceneData) => {
    const newScene = selectScene.filter(scene => scene.spotId !== curSpot.id)
    if (newScene.find(scene => scene.sceneId === data.id) || curSpot.linkScene === data.id) return
    setCurSelect(data.id === curSelect ? '' : data.id)
    setSelectScene(data.id === curSelect ? newScene : newScene.concat({ spotId: curSpot.id, sceneId: data.id }))
  }

  const confirmSelect = () => {
    if (curSelect === '') return
    showScene(curSelect)
    setShowModel(false)
  }
  const selectStyle = (id: string) => {
    if (curSelect === id) return "select-border"
    if (selectScene.find(scene => scene.sceneId === id) || curSpot.linkScene === id) return "selected-border"
    return ""
  }

  return(
    <Modal
      title="选择要标记的场景"
      open={true}
      onCancel={() => setShowModel(false)}
      width={800}
      footer={null}
    >
      <div className={s["scene-model-box"]}>
        {
          panoData.scenes.map((sceneItem: IPanoSceneData) => {
            return (
              <div
                key={sceneItem.id}
                className={"w-90 h-90 position-relative border-rd-5 overflow-hidden cursor-pointer".c(s[selectStyle(sceneItem.id)])}
                onClick={() => changeScene(sceneItem)}
              >
                <img src={sceneItem.pano?.thumbUrl} className="w-full h-full" alt="" />
                <div
                  className={s["title"].c("position-absolute bottom-0 bg-#00000080 w-full text-center c-#fff")}
                >
                  { sceneItem.pano?.name }
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-center mt-20">
        <Button type="primary" disabled={curSelect === ''} onClick={confirmSelect}>确认修改</Button>
      </div>
    </Modal>
  )
}