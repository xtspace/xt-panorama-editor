
interface CatalogueProps {
    folderId?: string
    folderList: FolderProps[]
    setShowFolder: (v: string) => void
    setShowList: (v: string) => void
}

export interface FolderProps {
  id: string
  name: string
}

export default function CatalogueModel(props: CatalogueProps) {
    const { folderId, folderList, setShowFolder, setShowList } = props

    const onClickCatalogue = (id:string) => {
      setShowFolder(id)
      setShowList(id)
    }

    return <>
        <div className='mt-20 flex flex-items-center'>
            <span
              onClick={() => {
                if (folderId === '0') return
                onClickCatalogue('0')
              }}
              className="cursor-pointer"
            >
                根目录
            </span>
            {
              folderList.length > 0 ? <>
                {
                  folderList?.map((folderItem: FolderProps) => 
                    <div key={folderItem.id} onClick={() => onClickCatalogue(folderItem.id)}
                    >
                      <span className="mx-10 c-zinc">&gt;</span>
                      <span
                        className={folderItem.id === folderId ? 'c-sky-400 cursor-pointer' : 'cursor-pointer'}
                      >
                        {folderItem?.name}
                      </span>
                    </div>
                  )
                }
              </> : <></>
            }
        </div>
    </>;
}