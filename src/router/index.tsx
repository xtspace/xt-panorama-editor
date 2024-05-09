
import { useRoutes } from "react-router-dom";
import Layout from "@/layout";
import Tour from '@/pages/tour'
import MediaPicture from '@/pages/media-picture'
import MediaVideo from '@/pages/media-video'
import MediaPanorama from '@/pages/media-panorama'
import MediaAudio from '@/pages/media-audio'
import Task from '@/pages/task'
import Preview from '@/pages/preview'
import Editor from '@/pages/editor'
import EditorBasic from '@/pages/editor-basic'
import EditorView from '@/pages/editor-view'
import EditorHotspot from "@/pages/editor-hotspot";
import Login from "@/pages/login";
import UserManagement from "@/pages/user-management";
import { getStorage } from '@/utils/storage';
import KeepAlive from 'react-activation';



export const RouterContainer = () => {
    const routes = [
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/tour",
            element: <Layout />,
            children: [
                {
                    path: "/tour",
                    element: <KeepAlive name='tour' cacheKey="UNIQUE_ID1"><Tour /></KeepAlive>
                },
                {
                    path: "/tour/picture",
                    element: <KeepAlive name='picture' cacheKey="UNIQUE_ID2"><MediaPicture /></KeepAlive>
                },
                {
                    path: "/tour/video",
                    element: <KeepAlive name='video' cacheKey="UNIQUE_ID3"><MediaVideo /></KeepAlive>
                },
                {
                    path: "/tour/panorama",
                    element: <KeepAlive name='panorama' cacheKey="UNIQUE_ID4"><MediaPanorama /></KeepAlive>
                },
                {
                    path: "/tour/audio",
                    element: <KeepAlive name='audio' cacheKey="UNIQUE_ID4"><MediaAudio /></KeepAlive>
                },
            ]
        },
        {
            path: "/task",
            element: <Task />
        },
        {
            path: "/preview/:fileId?",
            element: <Preview />
        },
        {
            path: "/editor",
            element: <Editor />,
            children: [
                {
                    path: "basic/:fileId",
                    element: <EditorBasic />
                },
                {
                    path: "view/:fileId",
                    element: <EditorView />
                },

                {
                    path: "hotspot/:fileId",
                    element: <EditorHotspot />
                }
            ]
        },
    ]
    if (getStorage('USER_ROLE')?.includes('admin') && !routes[1].children?.find(routeItem => routeItem.path === '/tour/user')) {
        routes[1].children?.push({
            path: "/tour/user",
            element: <UserManagement />
        })
    }
    return useRoutes(routes);
};


export const PanoRouterContainer = () => {
    const routes = [
        {
            path: "/",
            element: <Preview />
        },
    ]
    return useRoutes(routes);
}