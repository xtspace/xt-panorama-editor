import { useEffect, useState } from "react"


// 判断是否是游客
export function usePermission(username: string) {
    const USER = "youke"
    const [isFlag, setIsFlag] = useState(false)

    useEffect(() => {
        if (username === USER) {
            setIsFlag(true)
        }
    }, [username])

    return [isFlag]
}