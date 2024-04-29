
import { IMaterial, IMaterialProps, getMaterialList } from '@/api/material';
import { UploadTypeEnum } from '@/enum/upload';
import { useRequest, useSetState } from 'ahooks';
import { useEffect, useState } from 'react';



type TableData = { total: number, list: IMaterial[] }

type ReturnType = [TableData, React.Dispatch<React.SetStateAction<TableData>>, Partial<IMaterialProps>, (params: Partial<IMaterialProps>) => void]

export default function useAddMaterial(type: UploadTypeEnum, parentId: string | undefined = undefined): ReturnType {
    const [requestParams, setRequestParams] = useSetState<Partial<IMaterialProps>>({
        keyword: '',
        type,
        current: 1,
        size: 8,
        parentId
    })

    const [tableData, setTableData] = useState<TableData>({ total: 0, list: [] })

    const { run } = useRequest(getMaterialList, {
        manual: true,
        onSuccess: (data) => {
            setTableData({
                list: data.data.result.records,
                total: data.data.result.total
            })
        }
    })


    useEffect(() => {
        requestParams?.parentId && run(requestParams)
    }, [requestParams])


    return [tableData, setTableData, requestParams, setRequestParams]
}    