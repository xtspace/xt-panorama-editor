# 全景编辑器

### 线上体验
https://720.xtspace.cn

用户名：youke

密码：Youke123

**备注：数据会定期删除，请不要再体验账号上发布生产数据**

### 前言
全景编辑器旨在满足用户对于创建、管理和编辑全景图像的需求，通过提供丰富的功能和直观的界面，让用户能够轻松地实现他们的创意和想法。

### 技术栈
- `krpano.js`  1.21.2
- `React` 18.2.0
- `Typescript` 5.2.2

### 运行环境
- `node` >= 16.x.x
- `pnpm` >= 7.18.2

### 本地运行
```
git clone https://github.com/xtspace/xt-panorama-editor.git
cd xt-panorama-editor
pnpm i
pnpm start
```

###  功能概述
类似720云的在线全景查看功能，适配移动端和PC端

#### 基础版
- **全景图自动分片**：支持将全景图自动分片成立方体图或多层级瓦片图，以提高加载速度和性能。
- **全景视角设置**：允许用户设置全景图的视角，包括方向、倾斜角度等参数，以满足不同场景的需求。
- **自定义巡游**：支持对巡游的多种设置，以满足不同场景的需求。
- **添加热点类型**：支持添加多种类型的热点，包括图片、视频、跳转链接、文字等，用户可以自定义热点的样式和行为，并进行实时编辑。
- **动画效果**：提供小行星开场动画、场景切换动画和热点动画等效果，增强全景图的视觉吸引力和交互体验。
- **素材管理**：提供素材管理功能，允许用户上传、管理和删除全景图所需的素材文件，包括图像、视频等。
- **全景管理**：提供全景图的管理功能，包括创建新的全景项目、编辑现有全景项目、导出项目等。
- **离线部署**：可导出编译后的代码，以便进行二次开发和本地部署

#### 升级版
- **热点类型**：新增热点类型，例如（事件、文章等），丰富用户交互的方式，用户可以通过点击热点获取更多信息或进行互动。
- **沙盘模块**：利用 3D 全景技术与沙盘模型相结合，模拟真实场景并进行交互式展示。它将全景图像的沉浸式视觉体验与沙盘的空间布局结合在一起，允许用户通过交互查看、导航、分析虚拟环境或物理场景。通过手势或控制器，用户可以轻松调整视角和缩放，深入了解场景的每个细节。
- **辅助功能**：
  + **虚拟现实（VR）支持**：通过兼容 VR 设备，为用户提供沉浸式的体验，允许用户在虚拟环境中自由探索和互动。
  + **全屏模式**：用户可以选择全屏观看体验，消除界面干扰，专注于内容展示，增强视觉效果。
- **音乐模块**：
  + **全景音乐**：在场景中加入全景音效，创造沉浸式的听觉体验，让用户在浏览时感受到更真实的环境氛围
  + **热点音乐支持**：根据不同的热点区域播放特定音乐，增强交互感受。例如，用户接近特定事件或信息点时，自动触发相关的音乐或音效，提升用户的参与感和互动体验。

### 页面展示
<img width="1053" alt="image" src="https://github.com/user-attachments/assets/aacfc0d6-7b07-4967-af8f-2849f6589d3c">
<img width="1053" alt="image" src="https://github.com/user-attachments/assets/39e9c89a-70c6-482b-ab45-754c4920cd08">
<img width="1439" alt="image" src="https://github.com/user-attachments/assets/46e66cb0-a0b2-4da1-a36d-7006e408f7b7">



### 联系方式
![QR](https://github.com/xtspace/xt-panorama-editor/assets/65204427/ac9844b6-acca-4211-9cdd-087d6f7049e4)
