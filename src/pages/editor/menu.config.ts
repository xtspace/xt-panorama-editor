import global from "@/assets/global.png";
import view from "@/assets/view.png";
import hotspot from "@/assets/hotspot.png";
import cruise from "@/assets/cruise.png";
import mask from "@/assets/mask.png";
import music from "@/assets/music.png";
import sandBoxIcon from "@/assets/sand.png";

export const enum MenuEnum {
  BASIC = "basic",
  VIEW = "view",
  HOTSPOT = "hotspot",
  CRUISE = "cruise",
  MASK = "mask",
  MUSIC = "music",
  SANDBOX = "sandBox",
}

export const menus = [
  {
    icon: global,
    link: "/editor/basic",
    name: "全局",
    type: MenuEnum.BASIC,
  },
  {
    icon: view,
    link: "/editor/view",
    name: "视角",
    type: MenuEnum.VIEW,
  },
  {
    icon: hotspot,
    link: "/editor/hotspot",
    name: "热点",
    type: MenuEnum.HOTSPOT,
  },
  {
    icon: cruise,
    link: "/editor/cruise",
    name: "巡游",
    type: MenuEnum.CRUISE,
  },
  {
    icon: mask,
    link: "/editor/mask",
    name: "遮罩",
    type: MenuEnum.MASK,
  },
  {
    icon: sandBoxIcon,
    link: "/editor/sandBox",
    name: "沙盘",
    type: MenuEnum.SANDBOX,
  },
  {
    icon: music,
    link: "/editor/music",
    name: "音乐",
    type: MenuEnum.MUSIC,
  },
];
