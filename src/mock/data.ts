export const enum CategoryEnum {
    TEXT="text",
    IMG="img",
    VIDEO="video",
    LINK= "link",
    AUDIO="audio",
}

export interface IHotSpot{
    id?:string
    name?:string
    next?:string
    icon:{
        ath:number | string
        atv:number | string
        scale:number
        url:string
        edge:"center" | "bottom"
    },
    author?:boolean,
    title?:string,
    type:`${CategoryEnum}`,
    imgs?: Array< {
         id: string
         url:string
       }>,
    content?:string
    videoUrl?:string
}

export interface ISceneData {
    id:string
    name:string
    next:string
    img?:string
    hotspot:Array<IHotSpot>
}

export const data:ISceneData[] = [
    {
        "id": "scene0",
        "name": "门口",
        "next": "scene1",
        "img":"panos/0/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.LINK,
                "title": "入口",
                "icon": {
                    "ath": -33.867,
                    "atv": 9.985,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/qianjin.png"
                }
            }
        ]
    },
    {
        "id": "scene1",
        "name": "入口",
        "next": "scene2",
        "img":"panos/1/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.LINK,
                "title": "前言",
                "next": "scene2",
                "icon": {
                    "ath": -119.60812707,
                    "atv": 14.15445972,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/qianjin.png"
                }
            },
            {
                "type": CategoryEnum.LINK,
                "title": "1-3",
                "next": "scene3",
                "icon": {
                    "ath": -87.56402133,
                    "atv": 17.72720971,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/qianjin.png"
                }
            }
        ]
    },
    {
        "id": "scene2",
        "name": "前言",
        "next": "scene3",
        "img":"panos/2/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.LINK,
                "title": "1-3",
                "icon": {
                    "ath": 67.83613102,
                    "atv": 22.71378212,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/qianjin.png"
                }
            },
            {
                "type": CategoryEnum.LINK,
                "title": "4-6",
                "next": "scene4",
                "icon": {
                    "ath": -64.54302763,
                    "atv": 18.91453733,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/qianjin.png"
                }
            }
        ]
    },
    {
        "id": "scene3",
        "name": "1-3",
        "next": "scene4",
        "img":"panos/3/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -26.38914733,
                    "atv": 5.32588044,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4a12475ea6b55997a7901c0a29ac99dfv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -15.39139016,
                    "atv": 5.67485924,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/14cfd55f4da36269f350fdca83627bd9v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -3.47580761,
                    "atv": 6.08832434,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/df4d05ab302bf5f0f5b86dc83fb144f2v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 8.65696861,
                    "atv": 6.15405787,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/6586eee0e46f85dd8b2707337666f749v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 20.02446298,
                    "atv": 6.0992525,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/622f622b2e7f03c71c2b8f7cacf11f01v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 30.03930823,
                    "atv": 5.81440194,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/8cd268120554e2efba384a0256a604edv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 146.40619804,
                    "atv": 5.8336055,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/11e92bcab7c8b662cdf21dfc91309296v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 154.78830992,
                    "atv": 6.09429693,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2f776ff8b9c9df3969184071faad50d8v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 164.23893111,
                    "atv": 6.22193137,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/9ce8a044d9d2a5cfde7245d0d6edee81v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 174.77199624,
                    "atv": 6.13144586,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/a19f7790c3dbbb1d71d17e8e3418bcd3v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -174.64896567,
                    "atv": 5.97657814,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/51f6584236cfeb5a1b4888d78928e7eav5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -164.5468997,
                    "atv": 5.60750865,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/8b20c692f45cdb15f91fa19e09252eb2v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -155.69787602,
                    "atv": 5.0477945,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/1ceba13b625155efece557d144fbfdb9v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 111.63335575,
                    "atv": 6.65190879,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/cfc584d6ab8700f2f701e5b0c865a943v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 121.83024621,
                    "atv": 6.16767485,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/0b07b0e30aa67dfbf75440707a4f3d6bv5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene4",
        "name": "4-6",
        "next": "scene5",
        "img":"panos/4/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 54.12461805,
                    "atv": 19.48868101,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/69d4d3441739f8e1f14de8824f1c9382v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 97.6131183,
                    "atv": 17.17980124,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/da64f1f6100e57711e83d23620572635v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 133.72942631,
                    "atv": 14.02404734,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/069eb20ae28648a59f7023c75cf3066bv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 16.91727637,
                    "atv": 16.92292325,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/312226aee5a3505151aa52a32236f5cav5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -15.62942957,
                    "atv": 16.80456754,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/506f33adfd38e25b0c1b4d5741103ec8v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -103.23795089,
                    "atv": 11.00599972,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2bab058bde818d98963938800a5ae64fv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -130.78352294,
                    "atv": 8.61995123,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e268697e06d4e10feb08ef3ac8ec2e35v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -44.62749704,
                    "atv": 9.84874718,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/32540e36c7db251d3619f164cfb2c1cbv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -68.93872541,
                    "atv": 11.05936245,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e5ec1c495b71d594f014ac16a259ed4fv5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene5",
        "name": "7-9",
        "next": "scene6",
        "img":"panos/5/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 41.16118538,
                    "atv": 10.46244987,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/5e1601aeff981c0ab6d89688d2cae2d4v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 64.6863575,
                    "atv": 13.30706017,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/a9d0dc3d84b367ae581ea662cc8c43f9v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 99.03724885,
                    "atv": 13.32609902,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/28764047f17f41f5908528cfa03185c5v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 128.46962303,
                    "atv": 10.75748876,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/992e8598e2da5355d461e76e0962be9fv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -17.64335232,
                    "atv": 10.05354164,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/9a66a80cac2e7e0892056df961972b2fv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 0.05431249,
                    "atv": 10.73958504,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4ae8c238aaff74b9333fac38597a4d96v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 16.87271879,
                    "atv": 10.18186056,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/41de64930367b7a49bbd94a52e263f0ev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -71.59939113,
                    "atv": -12.92773626,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/3c8b44ce437cb57f5b317adcb11ef1bdv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -72.26497493,
                    "atv": 11.21091419,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/d47b7a226ceaa7c9655c5fd03ffce13av5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -39.46076189,
                    "atv": -9.73206585,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/ec1f3425feb37d48d409eaed43147c33v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -40.01108104,
                    "atv": 6.40444613,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/5ec480043ebb3f3a9c60f94baf57e00fv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -113.15627571,
                    "atv": 10.99950873,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/dd703460d8bb58100bc62f99fad00835v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -134.28810094,
                    "atv": 8.66966832,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4f22b7da0ade0609cb056b75557e1065v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -147.65284792,
                    "atv": 6.77032977,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/5d2a045e73b4f783d6dc49e6556141aav5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene6",
        "name": "10",
        "next": "scene7",
        "img":"panos/6/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 17.17175375,
                    "atv": 16.38319456,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs:[
                    {
                        url:"593jk7kktu2/2/6496e1e6eebbe44d9045ab12549da61cv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -15.85011783,
                    "atv": 13.08648635,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs:[
                    {
                        url:"593jk7kktu2/2/36b454d7711b11e1e1946a502064692dv5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene7",
        "name": "11-12",
        "next": "scene8",
        "img":"panos/11-12.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 75.11860142,
                    "atv": 5.33552312,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/0c8238b4536befde65d9684707f73ff8v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 84.14278058,
                    "atv": 5.29790032,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/341f38e84e3e9032139120a8be0d06bdv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 93.27103418,
                    "atv": 5.11864845,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/6add39e185417f014f54e3ad043df9f6v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -48.34023601,
                    "atv": 12.28011483,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/8b4d3c97667176a43fc9909f048b9c79v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -20.62399894,
                    "atv": 15.84115767,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/efdb0d29842cc3e47be32b0772c07810v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 16.799465,
                    "atv": 15.54908793,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e2679840c568213c1b2582ffa6ffc627v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 43.47317015,
                    "atv": 11.21188873,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/773cde069bb535f7477284e33fe36319v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 66.02134442,
                    "atv": 4.42989355,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/6d89c9284dec2cee537a3143a48f7bb3v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene8",
        "name": "13-14",
        "next": "scene9",
        "img":"panos/13-14.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 68.92355948,
                    "atv": 14.05895185,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/a2c3949512301d183c172e4955ef0bb4v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 103.30427448,
                    "atv": 13.40206792,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/8642408aa7100e28e68d3bffe78c6fdbv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 130.9341386,
                    "atv": 9.50985592,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/92fa7ef3d31a663beaea6a1c979c5cacv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 146.60584715,
                    "atv": 6.7211683,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/c6921936859db9a5a7692c2e70d8d50av5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 12.08366598,
                    "atv": -5.08837489,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/9da934af98bf90a7e1909ccd208b88abv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 17.827627,
                    "atv": -4.96392535,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/3d7acc6d4997df3c29541a155e4d8a8fv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 23.35356716,
                    "atv": -4.74020694,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/55cafb4945afdfdf4ca85342fdd04cacv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 28.77279683,
                    "atv": -4.63830892,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/d90d2c136361331bda10021b5c8a8505v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 12.25631448,
                    "atv": 10.68711811,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/b4a88ba65e7b571baf1f81e71fc2cedcv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 18.37173809,
                    "atv": 10.32287002,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e726f7c953f4936e2b89634f0c3fdfabv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 23.69975552,
                    "atv": 10.03324947,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/b3585b69d036dd75e4cdd9fdbb9e6186v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 29.00023176,
                    "atv": 9.66422527,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/a80137f3217435d0d718d4adbb379148v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 39.70600938,
                    "atv": 6.07782799,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/33dae85798370ef58cf93008f9c4db17v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 44.62920776,
                    "atv": 5.99644839,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/28c7a847ce29f0eacc180bb049eff35bv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -3.38806229,
                    "atv": 5.97120066,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/3e1910db241fdd8979ae873848565a0ev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -25.19056901,
                    "atv": -3.81535284,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/9c069456cfd197d6cd22414381dfdb98v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -18.41802233,
                    "atv": -4.16574087,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4e4e33b545fbde86c115102c0d886952v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -25.27252826,
                    "atv": 8.71596948,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2//35d7503fc9c6592aee47df677bce9f20v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -18.78262373,
                    "atv": 9.09625078,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/ad91723bdb801b66562137704e815e55v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -43.12270524,
                    "atv": 5.76978343,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/29531eb02b21a0d57c0c2cd808a663fbv5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene9",
        "name": "15-16",
        "next": "scene10",
        "img":"panos/15-16.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -28.869,
                    "atv": 4.360,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4760a4339846e21a0768a57407d28565v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 0.992,
                    "atv": 6.009,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/87dace9887666d47a005f6fc871247c4v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 32.562,
                    "atv": 5.674,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/7216673e1c6bd135b8615c01051bf0f3v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 51.982,
                    "atv": 4.620,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/baaa1972f1a28182f220a9fa0e4c6ca1v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath":75.844,
                    "atv": -5.359,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/a443498c2a277c5c976fcc7f0465d39cv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 74.673,
                    "atv": 3.808,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e794624cca71f8b2c98743b072b63776v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 88.987,
                    "atv": -4.957,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/af842b4271d6a4d26e0a169f052dbfe4v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 88.315,
                    "atv": 4.289,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/7331a6312731b29b3a3fc52b986359f1v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 102.230,
                    "atv": -4.355,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/354a2e7651a607209387074bf3c0e2bcv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 102.166,
                    "atv": 5.060,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/47624b049a1fe244f1c8c5eac315247ev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 114.742,
                    "atv": -3.585,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/36fb28462f270c369ce7734032886929v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 114.940,
                    "atv": 5.020,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/0bcf9093c2e97184ec05b0282e8a7cb4v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene10",
        "name": "17-18",
        "next": "scene11",
        "img":"panos/17-18.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 126.13167284,
                    "atv": 10.04377206,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/bbc295c344fb8e56accd67d38cd7388av5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 142.08768368,
                    "atv": 8.10229806,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/7d97062061f66a5b631ec7f8797643abv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 151.04484911,
                    "atv": 6.80990584,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/efd98425ea249e84fad8ff5738ecc7c2v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 156.71033482,
                    "atv": 6.01544928,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/f0e67beba382174f08f0d7836476b910v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 163.40181224,
                    "atv": 5.12635517,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/d7e6608f401f6877b43a9a7ecb64cff5v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 160.62693583,
                    "atv": 5.29569283,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/aff2f1118e9266b6e827c6c90dc7efefv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 88.16150132,
                    "atv": 9.90732504,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/a9c6734b7bdbc1cbf560827f44e6f420v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 53.25234426,
                    "atv": 7.81880927,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/1b2e15488e869852aeface7e54ab732dv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 69.45905915,
                    "atv": 8.88620614,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2615440be27f256cee11e8bdbe8eeb46v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -31.47086675,
                    "atv": 5.04911035,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/8afe0dc2b91e3a1a4f60f7785407f166v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -11.59313933,
                    "atv": 5.47221997,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/b86cd36b7649685bdfba9755e52c2c73v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 10.10842748,
                    "atv": 5.00715217,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/437dc76522d86bda2e3dca574665ffd0v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 28.44182387,
                    "atv": 4.51596839,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/075ffd879e1701fd3e84222340da3a14v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene11",
        "name": "19",
        "next": "scene12",
        "img":"panos/19.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -25.93470834,
                    "atv": -7.75472829,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/418632dabc744b216288cb6bc17a943dv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -15.09388016,
                    "atv": -8.63817249,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e1cbb48f2f0b7c960a51958a25ce5d4av5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -26.43834202,
                    "atv": 13.79323782,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/b8983c493d8686c7810473eb4a1ec729v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -15.35456781,
                    "atv": 14.4364746,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/3e7f84407d9c36a107a1d42b3adf7d36v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 16.76456607,
                    "atv": 16.51569429,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2d40754e8ca13c80d519e210f78005dbv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 45.66675355,
                    "atv": 13.20891766,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/cbe313627da5995c651896914dbd8fe9v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene12",
        "name": "20-21",
        "next": "scene13",
        "img":"panos/20-21.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -35.19939991,
                    "atv": -8.92028871,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/1cd6fde43893adb17906a738ae56f961v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -13.19863877,
                    "atv": -10.60501181,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/54db52ca634e9cf0eff868c138afda6fv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 13.65391107,
                    "atv": -10.37607788,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2b5f2249fee1782670aa57fd32971a3dv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 36.49721925,
                    "atv": -8.33781223,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/8458adec6f2970fe7e8d905a8ec0066cv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -35.56692071,
                    "atv": 9.36245132,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/eb6f6de16a9d06d15a1a38a112945649v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -14.16227172,
                    "atv": 11.40007037,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e5ee362dafb4fb29ad34ca385b3b8c48v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 12.44140889,
                    "atv": 11.92457957,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/d5519a6f54ab52439884fc2735b14d39v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 35.79366246,
                    "atv": 10.56428988,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/c95e63b85684db18f93fe818d61d5bfav5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 75.1300431,
                    "atv": 13.79657692,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/68d3d3334889918d93ab8cada7750cb2v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 110.48821584,
                    "atv": 13.77758177,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2f756284fa1bfda1e0c01d06de2c9d30v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene13",
        "name": "22",
        "next": "scene14",
        "img":"panos/22.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -37.81291613,
                    "atv": 4.16054506,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/c4113adb9e08f00b1800579d64dec389v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -28.37758594,
                    "atv": 4.66665039,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/ff94a19a9b76161adfb3cacab33c01bev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -18.14514947,
                    "atv": 6.54711177,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/9084d38bc768f618dd782d43cdc54163v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -7.25203945,
                    "atv": 6.5857842,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/b7bcded445beab10005ac0ab419926d5v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 4.13752318,
                    "atv": 6.41851734,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4155f7903635c98424ed9f7dd63288d7v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 15.48738933,
                    "atv": 6.48060238,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/991e1d055783db44c44656e1cdb6caa8v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 26.30351669,
                    "atv": 6.29532729,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/512aea520ad5e44359736e0be61f3514v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 35.37449061,
                    "atv": 5.80901933,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/97113a1b3c282009887de590bb405f98v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene14",
        "name": "23",
        "next": "scene15",
        "img":"panos/23.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -37.15685249,
                    "atv": 4.13420302,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2//441eec3648501d1c881df99447c4dfb4v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -30.43337331,
                    "atv": 4.68008908,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/7493855e3bf39a42dc54a43eb6719158v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -22.63415185,
                    "atv": 5.18926727,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/e833575acf1c617d61773ee6c2b48b17v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -14.5392874,
                    "atv": 5.79778674,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/a55347a3da1b4b4d77a37759381a534dv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -5.18522663,
                    "atv": 6.19743948,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/1594c99470a561809c711a000304c3f8v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 4.28733142,
                    "atv": 6.09586305,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/14bfb8169e57e77e0884d6dff0adc8bcv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 13.46026387,
                    "atv": 6.25503025,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/254a12615628b368eb731459a067b149v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 22.21406968,
                    "atv": 6.16867222,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/42e18aea5330d47cadbfd4ee79b0ad40v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene15",
        "name": "24",
        "next": "scene16",
        "img":"panos/24.tiles/thumb.jpg",
        "hotspot": []
    },
    {
        "id": "scene16",
        "name": "25-26",
        "next": "scene17",
        "img":"panos/25-26.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -20.983,
                    "atv": 3.787,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2fa1385ded651888ad627a84013791d4v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -10.805,
                    "atv": 4.085,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/007b8cbb120c051420e28085514ee65dv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 0.417,
                    "atv": 4.469,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4eb73c85366bf6c5fdca06de09cf6baev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath":11.106,
                    "atv": 4.690,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/f2b9869a75343c917c926b32c24add47v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 22.154,
                    "atv": 4.428,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/4eb73c85366bf6c5fdca06de09cf6baev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 30.726,
                    "atv": 4.022,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/f2b9869a75343c917c926b32c24add47v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath":54.090,
                    "atv": 9.739,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/fc9ab09d2b895f25d77cf9404198db9ev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 75.961,
                    "atv": 11.967,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/148d013d1322a3ed202ff64baed427afv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 105.702,
                    "atv": 12.800,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/704d8d8fbd7bc7421b45afb5295e623dv5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 128.603,
                    "atv":10.243,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2dfe58c52106387cd1d040be6ba47232v5.jpg"
                    }
                ]
            }
        ]
    },
    {
        "id": "scene17",
        "name": "27-28",
        "next": "",
        "img":"panos/27-28.tiles/thumb.jpg",
        "hotspot": [
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -120.911,
                    "atv": 2.525,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/d580576717c868798ed7bd107ec08e4ev5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -111.100,
                    "atv": 2.702,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/7e841b6fa2e3df448ace51f5db0cb536v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath":-99.970,
                    "atv": 3.259,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/b7ca554c2f9b0b5460f65368ece36c44v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -87.021,
                    "atv": 3.586,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/016a8b10b6d7a3e8649bdcd6c30cae38v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": -18.940,
                    "atv": 2.032,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/289fa885307d1c97ef2dcf8f222a8716v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath":-8.428,
                    "atv": 2.563,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/2d4e59015c940e97ffed5cc465ae9681v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 2.249,
                    "atv": 3.037,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/6cd1a5cd5ec1d40c2dec645990de17d5v5.jpg"
                    }
                ]
            },
            {
                "type": CategoryEnum.IMG,
                "title": "",
                "icon": {
                    "ath": 13.986,
                    "atv": 3.188,
                    "edge": "center",
                    "scale": 0.5,
                    "url": "assets/yuandian.png"
                },
                imgs: [
                    {
                        url:"593jk7kktu2/2/408b2c4a1bb31f095075e854e82f210dv5.jpg"
                    }
                ]
            }
        ]
    }
]