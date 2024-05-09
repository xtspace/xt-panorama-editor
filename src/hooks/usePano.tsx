
import { IPanoParams, getPanoList, IPanoData } from '@/api/pano';
import { useRequest, useSetState } from 'ahooks';
import { useEffect, useState } from 'react';



type PanoTableData = { total: number, list: IPanoData["records"] }

type ReturnType = [PanoTableData, React.Dispatch<React.SetStateAction<PanoTableData>>, IPanoParams, (params: IPanoParams) => void]

export default function useManagementUser(): ReturnType {
    const [requestParams, setRequestParams] = useSetState<IPanoParams>({
        keyword: '',
        current: 1,
        size: 8
    })

    const [tableData, setTableData] = useState<PanoTableData>({ total: 0, list: [] })


    const { run } = useRequest(getPanoList, {
        manual: true,
        onSuccess: (data) => {
            setTableData({
                list: data.data.result.records,
                total: data.data.result.total
            })
        }
    });


    useEffect(() => {
        run(requestParams)
    }, [requestParams])


    return [tableData, setTableData, requestParams, setRequestParams]
}    