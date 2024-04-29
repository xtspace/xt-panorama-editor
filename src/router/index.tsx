
import { useRoutes } from "react-router-dom";
import Layout from "@/layout";
import Tour from '@/pages/tour'
import MediaPicture from '@/pages/media-picture'
import MediaVideo from '@/pages/media-video'
import MediaPanorama from '@/pages/media-panorama'
import MediaAudio from '@/pages/media-audio'
import Login from "@/pages/login";
import UserManagement from "@/pages/user-management";
import { getStorage } from '@/utils/storage';
import { NotFound } from "@/pages/404";

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
                    element: <Tour />
                },
                {
                    path: "/tour/picture",
                    element: <MediaPicture />
                },
                {
                    path: "/tour/video",
                    element: <MediaVideo />
                },
                {
                    path: "/tour/panorama",
                    element: <MediaPanorama />
                },
                {
                    path: "/tour/audio",
                    element: <MediaAudio />
                },
            ]
        }, {
            path: "*",
            element: <NotFound />
        }
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