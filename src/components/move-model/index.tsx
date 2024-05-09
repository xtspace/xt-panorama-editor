import { UploadTypeEnum } from "@/enum/upload";
import useAddMaterial from '@/hooks/useAddMaterial'
import folder from '@/assets/folder.png';
import CatalogueModel from '@/components/catalogue-folder';
import { useState, useEffect } from "react";
import { onDoubleClick } from '@/utils/common'
import { produce } from 'immer';
import { concat } from "lodash-es";
import { IMaterial } from '@/api/material';

interface MoveProps {
  moveList: Array<IMaterial>,
  materialType: UploadTypeEnum,
  setToId: (id: string) => void
}
interface FolderData {
  id: string
  name: string
}

export default function MoveModel(props: MoveProps) {
  const { moveList, materialType, setToId } = props
  const [tableData, , , setRequestParams] = useAddMaterial(materialType)
  const [folderId, setFolderId] = useState<string>('0')
  const [folderList, setFolderList] = useState<FolderData[]>([])
  const onDoubleClickFn = onDoubleClick();
  const [selectToId, setSelectToId] = useState<string>('0')

  const resetFolderList = (id:string) => {
    setFolderId(id);
    const nowFolderIndex = folderList.findIndex((item:FolderData) => item?.id === id)
    id === '0' ? setFolderList([]) : setFolderList(folderList.slice(0, nowFolderIndex + 1))
  }

  const onClickFolder = (row: IMaterial) => {
    if (!row.id) return
    setToId(row.id)
    setSelectToId(row.id)
  };

  const onDoubleClickFolder = (row: IMaterial) => {
    if (!row.id) return
    setToId(row.id)
    setFolderId(row?.id)
    setSelectToId('0')
    setToId('0')
    setFolderList(produce(draft => {
        return concat(draft, {
            id: row?.id,
            name: row.name
        })
    }))
  };

  useEffect(() => {
      setSelectToId('0')
      setToId('0')
      setRequestParams({ parentId: folderId })
  }, [folderId])

  return <>
      <CatalogueModel folderId={folderId} folderList={folderList} setShowFolder={setFolderId} setShowList={resetFolderList} />
      {
        tableData.list.map((tableItem) => 
            <div className="mt-10" key={tableItem.id}>
            {
                tableItem.directory && !moveList.find(noItem => noItem.id === tableItem.id) ?
                <div
                  className="flex flex-items-center cursor-pointer"
                  style={{backgroundColor: (selectToId === tableItem.id) ? "#a5d8ff" : "#fff"}}
                  onClick={
                    () => onDoubleClickFn({
                      singleClick: () => { onClickFolder(tableItem) },
                      doubleClick: () => { onDoubleClickFolder(tableItem) },
                      params: tableItem,
                    })
                  }
                >
                    <img className="w-25 mr-5" src={folder} />
                    <span>{tableItem.name}</span>
                </div> : <></>
            }
            </div>
        )
      }
  </>;
}