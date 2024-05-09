
export const enum HotspotTypeEnum {
    TEXT = "text",
    IMG = "img",
    VIDEO = "video",
    LINK = "link",
    AUDIO = "audio"
}


export const hotspotList = [
    {
        label: "跳转",
        value: HotspotTypeEnum.LINK
    },
    {
        label: "图片",
        value: HotspotTypeEnum.IMG
    },
    {
        label: "文本",
        value: HotspotTypeEnum.TEXT
    },
    {
        label: "视频",
        value: HotspotTypeEnum.VIDEO
    },
    {
        label: "音频",
        value: HotspotTypeEnum.AUDIO
    }
]


export const iconList = [
    {
        url: "assets/qianjin.png",
        oy: 0,
        value: "qianjin"
    },
    {
        url: "assets/yuandian.png",
        oy: 6,
        value: "yuandian"
    },
    {
        url: "assets/youzhuan.png",
        oy: 6,
        value: "youzhuan"
    },
    {
        url: "assets/zuozhuan.png",
        oy: 6,
        value: "zuozhuan"
    },
    {
        url: "assets/shiping.png",
        oy: 6,
        value: "shiping"
    }
]