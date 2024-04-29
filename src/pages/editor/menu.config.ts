import global from "@/assets/global.png"
import view from "@/assets/view.png"
import hotspot from "@/assets/hotspot.png"

export const enum MenuEnum {
    BASIC="basic",
    VIEW="view",
    HOTSPOT="hotspot"
}

export const menus =[
    {
        icon:global,
        link:"/editor/basic",
        name:"全局",
        type:MenuEnum.BASIC
    },
    {
        icon:view,
        link:"/editor/view",
        name:"视角",
        type:MenuEnum.VIEW
    },
    {
        icon:hotspot,
        link:"/editor/hotspot",
        name:"热点",
        type:MenuEnum.HOTSPOT
    },
]