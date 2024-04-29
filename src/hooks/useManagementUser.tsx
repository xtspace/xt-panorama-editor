
import { getUserListApi, UserProps } from '@/api/user';
import { useRequest, useSetState } from 'ahooks';
import { useEffect, useState } from 'react';



type UserTableData = { total: number, list: any["records"] }

type ReturnType = [UserTableData, Partial<UserProps>, (params: Partial<UserProps>) => void]

export default function useManagementUser(): ReturnType {
    const [requestParams, setRequestParams] = useSetState<Partial<UserProps>>({
        keyword: '',
        current: 1,
        size: 8
    })

    const [tableData, setTableData] = useState<UserTableData>({ total: 0, list: [] })

    const { run } = useRequest(getUserListApi, {
        manual: true,
        onSuccess: (data) => {
            setTableData({
                list: data.data.result.records,
                total: data.data.result.total
            })
        }
    })


    useEffect(() => {
        run(requestParams)
    }, [requestParams])


    return [tableData, requestParams, setRequestParams]
}    