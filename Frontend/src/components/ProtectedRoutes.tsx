import { Outlet, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProtectedRoutes() {
    const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null)
     

    useEffect(() => {
        let isMounted = true

        const checkAuthentication = async () => {
            try {
                const { data } = await axios.get<{ isAuthenticated: boolean }>(
                    `http://localhost:3000/api/v1/auth/user/authenticated`, 
                    { withCredentials: true }
                )
                if (isMounted) {
                    setAuthenticated(data.isAuthenticated)
                }
            } catch (error) {
                if (isMounted) {
                    setAuthenticated(false)
                }
            }
        }

        checkAuthentication()

        return () => {
            isMounted = false
        }
    }, [])

    if (isAuthenticated === null) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/auth/signin' />
}
