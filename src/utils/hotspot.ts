import { IHotSpot, IPanoSceneData } from "@/api/pano";
import { IconMarkerEnum, IconTypeEnum } from "@/enum/hotspot";
import { HotspotTypeEnum, iconList } from "@/pages/editor-hotspot/config";

export function getInitParams():IHotSpot{
    return {
        id: "",
        type: HotspotTypeEnum.LINK,
        videos: [],
        showTitle: true,
        textType: IconMarkerEnum.LINE,
        title: "",
        iconType: IconTypeEnum.IMGS,
        icon: {
            ath: 0,
            atv: 0,
            url: iconList[0].url,
            oy: iconList[0].oy,
        }
    }
}



export function getSceneInitConfig(id: string):Omit<IPanoSceneData, "pano"> {
  return {
    id,
    view: {
      fov: 120,
      fovMax: 140,
      fovMin: 70,
      hlookAt: 0,
      vlookAt: 0
    },
    hotspot: []
  }
}

export function getSceneMaterialConfig(id: string):Omit<IPanoSceneData, "pano"> {
  return {
    id,
    view: {
      fov: 120,
      fovMax: 140,
      fovMin: 70,
      hlookAt: 0,
      vlookAt: 0
    },
    hotspot: []
  }
}