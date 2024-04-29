import { IPanoDetailData, getPanoDetail } from "@/api/pano";
import { immerable } from 'immer';

let panoData: IPanoDetailData;
let listeners: Array<Function> = [];

const panoStore = {
  [immerable]: true,

  async requestData(id: string) {
    const res = await getPanoDetail(id)
    return res?.data?.result
  },

  
  setPanoData(data: IPanoDetailData) {
    panoData = data
    emitChange()
  },


  subscribe(listener: Function) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },


  getSnapshot() {
    return panoData
  }
}



function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}



export {
  panoStore
}