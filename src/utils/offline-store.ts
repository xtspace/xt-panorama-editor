import { immerable } from 'immer';

let offlineData: string[] = []
let listeners: Array<Function> = [];


const offlineStore = {
  [immerable]: true,

  
  setOfflineData(data: string[]) {
    offlineData = data
    emitChange()
  },


  subscribe(listener: Function) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },


  getOfflineData() {
    return offlineData
  }
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}


export {
  offlineStore
}