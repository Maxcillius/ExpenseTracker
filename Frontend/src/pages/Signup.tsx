import axios, { AxiosError, AxiosResponse } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import jungle from '../assets/bg.jpg'
import { Toaster, toast } from 'sonner'
import MyErrorResponse from "../types/Error"

export default function Signup() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [ name, setName ] = useState('')

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post(`http://localhost:3000/api/v1/auth/user/signup`, {
            email,
            password,
            name    
        },
            {
                withCredentials: true
            }
        ).then((data: AxiosResponse) => {
            toast.success(data.data.message)
            navigate("/Dashboard")
        }).catch((data: AxiosError<MyErrorResponse>) => {
            toast.error(data.response?.data.message)
        })
    }

    return (
        <div className="flex flex-col justify-center h-screen w-screen bg-slate-500" style={{
            backgroundImage: `url(${jungle})`
        }}>
            <Toaster />
            <div className="flex flex-row justify-center">
                <div className="flex flex-col justify-center bg-white px-10 py-5 w-[600px] h-[400px] shadow-xl">
                    <form onSubmit={handleAuth} className="flex flex-col justify-center gap-10">
                        <h1 className="text-xl text-center pt-10 pb-5 font-bold">Sign up</h1>
                        <div className="flex flex-col justify-center gap-5">
                            <input onChange={(e) => { setName(e.target.value) }} type="text" className="w-full text-md rounded-md bg-slate-100 focus:outline-none border-0 hover:bg-slate-200" placeholder="name" />
                            <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="w-full text-md rounded-md bg-slate-100 focus:outline-none border-0 hover:bg-slate-200" placeholder="email" />
                            <input onChange={(e) => { setPass(e.target.value) }} type="password" className="w-full text-md rounded-md bg-slate-100 focus:outline-none border-0 hover:bg-slate-200" placeholder="password" />
                        </div>
                        <div className="flex flex-row justify-center">
                            <button type="submit" className="p-2 text-center bg-blue-500 text-white rounded-md w-full hover:bg-blue-700">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}