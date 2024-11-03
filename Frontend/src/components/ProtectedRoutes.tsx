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
                    `https://www.oldmanmcgucket.xyz/api/v1/auth/user/authenticated`, 
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
        return (
            <div className="flex flex-row justify-center h-screen w-screen">
                <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-semibold">Loading...</h1>
                </div>
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/auth/signin' />
}
