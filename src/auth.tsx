import { useLocation, useNavigate } from "react-router-dom"
import { STORAGE } from "./enum/storage"
import { useEffect } from "react"
import { hasStorage } from "./utils/storage";

export default function Auth({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const location = useLocation();



    useEffect(() => {
        if (location.pathname.includes('/preview')) return
        if (!hasStorage(STORAGE.TOKEN)) {
            navigate('/', { replace: true })
        }
    }, [location.pathname])

    return children
}