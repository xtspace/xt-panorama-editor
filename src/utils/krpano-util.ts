import { immerable } from "immer"
import { IPanoSceneData, IHotSpot } from '@/api/pano'
import { delay,  fill, filter, has, isUndefined, keys, map, omit } from 'lodash-es'
import { UploadSliceEnum } from "@/enum/upload"
import { CategoryEnum } from "@/mock/data"
import { IconMarkerEnum, IconTypeEnum } from "@/enum/hotspot"


const SPOT_PREFIX = "hotspot"

type SpotDragParams = (data: IHotSpot) => void
type SpotClickParams = (id: string) => void


class Krpano {
    [immerable] = true

    krpano: any
    dragModel = true
    currentHotspot: IHotSpot | undefined
    setSpotDragObserver: SpotDragParams = () => { }
    setSpotClickObserver: SpotClickParams = () => { }


    constructor(krpano: any) {
        this.krpano = krpano
    }

    
    init(data: IHotSpot[]) {
        map(data,d=>this.addHotSpot(d))
    }


    create(data: IHotSpot) {
        this.createSpotGroup(data)
        this.setHotSpotBorder()
        this.hotspotMouse()
    }


    createScene(data: IPanoSceneData) {
        const scene = this.krpano.scene.createarrayitem('scene' + data.id);
        const url = '.' + data.pano.thumbUrl?.match(/\/file\/view\/img\/\d+/)?.[0]
        
        scene.thumburl = `${url}/thumb.jpg`;
        scene.content = `
            <view hlookat='${data.view.hlookAt}' vlookat='${data.view.vlookAt}' fovtype="MFOV" fov='${data.view.fov}'  fovmin='${data.view.fovMin}' fovmax='${data.view.fovMax}' limitview="auto" />
                <preview url="${url}/preview.jpg" />
              
                <image>
                      ${'' + data.pano.type === UploadSliceEnum.CUBE ?
                `<cube url="${url}/pano_%s.jpg" />` : `<sphere url="${url}/l%l/%0v/l%l_%0v_%0h.jpg" multires='${data.pano.multires}' />`
            }
                </image>
                `;
    }



    editorScene(params: any) {
        keys(params).forEach(key => {
            this.krpano.set(`view.${key}`, params[key])
        })
    }


    getDragHotSpot() {
        const spotName = SPOT_PREFIX + this.currentHotspot?.id
        const hotspot = this.krpano.get(SPOT_PREFIX).getArray();

        const hss = filter(hotspot, d => [spotName, 'border', `${spotName}-title`, `${spotName}-gif`].includes(d.name))
        return hss
    }


    setHotSpotBorder(data = this.currentHotspot) {
        if (!this.dragModel) return
        this.hideSpotBorder()
        const hotspot = this.getHotspotList()
        const borderIndex = hotspot.findIndex((d: any) => d.name.includes('border'))
        if (borderIndex === -1) {
            this.createHotSpot({
                name: `border`,
                oy: 5,
                ath: data?.icon?.ath,
                atv: data?.icon?.atv,
                html: `<div class="hotspot-border"></div>`,
                visible: data?.iconType === IconTypeEnum.IMGS || data?.iconType === IconTypeEnum.CUSTOM
            });
        } else {
            hotspot[borderIndex].visible = !isUndefined(has(data, 'iconType')) ? data?.iconType === IconTypeEnum.IMGS || data?.iconType === IconTypeEnum.CUSTOM : true
            hotspot[borderIndex].ath = data?.icon?.ath
            hotspot[borderIndex].atv = data?.icon?.atv
        }
    }


    hideSpotBorder() {
        map(this.getHotspotList((d: any) => d), (d) => {
            if (d.name.includes('border')) {
                d.visible = false
            }
        });
    }


    removeHotSpotGroup(name: string) {
        const indexList = map(this.getHotspotList(), (d, idx) => {
            if (d.name.includes(name)) return idx
        })?.filter(Boolean)
        map(fill(indexList, indexList[0]), d => this.krpano.removehotspot(d))
        this.hideSpotBorder()
    }



    resetHotSpot() {
        this.hideSpotBorder()
    }


    createHotSpot(data: any) {
        const hs = this.krpano.addhotspot();
        const isText = data.name.includes("title") || data.name.includes("border") || data.name.includes("gif")
        Object.assign(hs, {
            name: data.name,
            type: isText ? "text" : "image",
            edge: "bottom",
            bg: "rgba(0,0,0,0)",
            _type: data.type,
            onloaded: data.iconType === IconTypeEnum.IMGS ? "do_crop_animation(86,86,13);" : null,
            width: isText ? hs.width : '86',
            height: isText ? hs.width : '86'
        }, data);
        hs.onclick = hs._type && this.loadScene(hs.next)
    }


    createSpotGroup(data: any) {
        this.currentHotspot = data
        const spotName = SPOT_PREFIX + data.id
        const { ath, atv, url, oy } = data.icon ?? {};
        const params = omit(data, ["type"])
        data.iconType === IconTypeEnum.CUSTOM ? this.createHotSpot({
            name: spotName + "-gif",
            _type: data.type,
            ath, atv, oy: 10,
            html: url ? `<img src=${url} style="width: 50px;height: 50px" />` : `<div style="width: 50px;height: 50px" />`,
            ...params,
            visible: data.iconType === IconTypeEnum.CUSTOM,
        }) : this.createHotSpot({ name: spotName, ath, atv, scale: 0.5, url, oy, _type: data.type, visible: data.iconType === IconTypeEnum.IMGS, ...params });
        this.createHotSpot({
            name: spotName + "-title",
            _type: data.type,
            ath, atv, oy: -50,
            html: `<div class=${data.showTitle ? (data.iconType !== IconTypeEnum.IMGS && data.textType === IconMarkerEnum.ARROW) ? 'hotspot-marker-text' : 'hotspot-text' : 'hidden'}>${data?.title ?? ""}</div>`,
            visible: data?.showTitle || false,
            ...params
        })
    }


    editorHotSpot(data: IHotSpot) {
        if(!data.id) return
        const list = this.getHotspotList((d) => d.name.includes(data.id) && !d.name.includes("border"))
        const iconSpot = list[0]
        const titleSpot = list[1]
        if (!titleSpot && !iconSpot) return
        this.editorTitleSpot(titleSpot, data)
        this.editorIconSpot(iconSpot, data)
    }


    editorTitleSpot(spot: any, data: IHotSpot) {
        spot.html = `<div class=${(data.iconType !== IconTypeEnum.IMGS && data.textType === IconMarkerEnum.ARROW) ? 'hotspot-marker-text' : 'hotspot-text'}>${data?.title || ""}</div>`
        spot.iconType = data.iconType
        spot.visible = data?.showTitle ?? true
    }


    editorIconSpot(spot: any, data: IHotSpot) {
        if(data.iconType === IconTypeEnum.CUSTOM) spot.html = data.icon?.url ? `<img src=${data.icon?.url} style="width: 50px;height: 50px" />` : `<div style="width: 50px;height: 50px" />`
        if(data.iconType === IconTypeEnum.IMGS) spot.url = data.icon?.url
        spot.oy = data.iconType === IconTypeEnum.CUSTOM ? 10 : data.icon?.oy
        spot.onloaded = null
        spot.iconType = data.iconType
        spot.visible = data.iconType === IconTypeEnum.IMGS || data.iconType === IconTypeEnum.CUSTOM

        delay(() => {
            if (data.iconType === IconTypeEnum.IMGS) {
                spot.onloaded = "do_crop_animation(86,86,13);"
            }
        }, 30)
    }


    addHotSpot(data: IHotSpot) {
        delay(() => {
            this.createSpotGroup(data)
            this.hotspotMouse()
        }, 30)
    }

    setHotSpotVisible(visible: boolean) {
        delay(() => {
            this.getHotspotList((d: any) => d.visible = visible)
        }, 400)
    }


    hotspotMouse() {
        if (!this.dragModel) return
        const self = this
        const dragList = this.getDragHotSpot()
        dragList.forEach(d => {
            d.ondown = () => {
                const hs_screen = this.krpano.spheretoscreen(d.ath, d.atv);
                const offsetx = this.krpano.mouse.stagex - hs_screen.x;
                const offsety = this.krpano.mouse.stagey - hs_screen.y;

                this.krpano.actions.asyncloop(
                    function () { return d.pressed; },
                    function () {
                        const pt = self.krpano.screentosphere(self.krpano.mouse.stagex - offsetx, self.krpano.mouse.stagey - offsety);
                        d.ath = pt.x;
                        d.atv = pt.y;

                        dragList.forEach(h => {
                            if (h !== d) {
                                h.ath = pt.x;
                                h.atv = pt.y;
                            }
                        });
                    }
                );
            };

            d.onclick = (event: any) => {
                this.setCurrentHotSpot(event)
                this.setHotSpotBorder()
                this.hotspotMouse()
                this.setSpotClickObserver(this.currentHotspot!.id)
            }

            d.onup = (event: any) => {
                this.setCurrentHotSpot(event)
                this.setSpotDragObserver(this.currentHotspot!)
                this.hideSpotBorder()
            }
        })
    }


    setCurrentHotSpot(event: any) {
        let id = event.name === "border" ? this.currentHotspot?.id : event.name
        if (id.includes("-title")) {
            id = id.replace(SPOT_PREFIX, "")?.replace("-title", "")
        } else if (id.includes("-gif")) {
            id = id.replace(SPOT_PREFIX, "")?.replace("-gif", "")
        } else {
            id = id.replace(SPOT_PREFIX, "")
        }
        this.currentHotspot = {
            id,
            iconType: event.iconType,
            textType: event.textType,
            icon: {
                ath: event.ath,
                atv: event.atv,
            }
        }
    }


    registerDragObserver(callback: SpotDragParams) {
        this.setSpotDragObserver = callback
    }


    registerClickObserver(callback: SpotClickParams) {
        this.setSpotClickObserver = callback
    }


    getHotspotList(callback?: (hotspot: any) => void) {
        const hotspot = this.krpano.get(SPOT_PREFIX).getArray();
        return callback ? hotspot?.filter(callback) : hotspot
    }


    loadScene(name: string) {
        return `loadscene(scene${name},null,MERGE,BLEND(1.0, linear))`
    }


    flyToCenter(id: string) {
        const spot = this.getHotspotList((d: any) => d.name.includes(id))?.[0]

        this.krpano.call("tween(view.hlookat, " + spot.ath + ", 0.3, easeInOutQuad);");
        this.krpano.call("tween(view.vlookat, " + spot.atv + ", 0.3, easeInOutQuad);");
    }


    addEventListener(type: `${CategoryEnum}`, callback: (...args: Parameters<any>) => void) {
        const hotspot = this.getHotspotList((d) => d._type === type)
        hotspot?.map((d: any) => d.onclick = callback)
    }


    setDrag(drag: boolean) {
        this.dragModel = drag
    }


    getView() {
        return {
            ath: this.krpano.get("view.hlookat"),
            atv: this.krpano.get("view.vlookat"),
        }
    }
}

export {
    Krpano
}