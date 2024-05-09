import { createContext } from 'react';
import { IPanoDetailData, IPanoSceneData } from '@/api/pano';

export const Context = createContext<{
    curPano?: IPanoSceneData
    panoData: IPanoDetailData
    krpanoRef?: any
    viewRef?: any
    setPanoData?: (data: IPanoDetailData) => void
}>({
    panoData: { materials: [], panos: [], scenes: [], profile: '', title: "", count: 0 }
});
