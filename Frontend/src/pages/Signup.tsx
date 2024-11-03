import axios, { AxiosError, AxiosResponse } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import jungle from '../assets/bg.jpg'
import { Toaster, toast } from 'sonner'
import MyErrorResponse from "../types/Error"
import { Link } from "react-router-dom"

export default function Signup() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [ name, setName ] = useState('')

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post(`https://3.111.68.152:3000/api/v1/auth/user/signup`, {
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
            <div className="flex flex-col justify-center bg-white md:px-10 rounded-lg px-10 py-10 md:w-[600px] md:h-[450px] shadow-xl">
                    <form onSubmit={handleAuth} className="flex flex-col justify-center gap-10">
                    <h1 className="text-xl text-center md:pt-10 pb-5 font-bold">Sign up</h1>
                        <div className="flex flex-col justify-center gap-5">
                            <input onChange={(e) => { setName(e.target.value) }} type="text" className="w-full text-sm md:text-md rounded-md bg-slate-100 focus:outline-none border-0 hover:bg-slate-200" placeholder="name" />
                            <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="w-full text-sm md:text-md rounded-md bg-slate-100 focus:outline-none border-0 hover:bg-slate-200" placeholder="email" />
                            <input onChange={(e) => { setPass(e.target.value) }} type="password" className="w-full text-sm md:text-md rounded-md bg-slate-100 focus:outline-none border-0 hover:bg-slate-200" placeholder="password" />
                        </div>
                        <div className="flex flex-row justify-center">
                            <button type="submit" className="p-2 text-sm md:text-md text-center bg-blue-500 text-white rounded-md w-full hover:bg-blue-700">Signup</button>
                        </div>
                    </form>
                    <div className="flex flex-row justify-center md:pt-10 pt-5 md:pb-3">
                        <p className="text-sm text-slate-500">Already have an account?
                            <Link to={'/auth/signin'} className="px-3 underline text-black">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}