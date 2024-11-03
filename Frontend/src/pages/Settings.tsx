import Sidebar from '../components/sidebar.tsx'
import { sidebarToggle } from '../atoms/sidebarToggle.ts'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { categoriesAtom } from '../atoms/Data.ts'
import Category from '../types/category.ts'
import axios, { AxiosError } from 'axios'
import sessionInterface from '../types/session.ts'
import { Trash } from 'lucide-react'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { categoryNameMap } from '../atoms/Data.ts'
import { ChromePicker } from 'react-color'
import { Toaster, toast } from 'sonner'
import MyErrorResponse from '../types/Error.ts'

export default function Settings() {

    const isSidebar = useRecoilValue(sidebarToggle)
    const [ category, setCategory ] = useState('')
    const categories = useRecoilValue(categoriesAtom)
    const [ alert, setAlert ] = useState(false)
    const [ session, setSession ] = useState<sessionInterface>()
    const setCategories = useSetRecoilState(categoriesAtom)
    const setCategoryMap = useSetRecoilState(categoryNameMap)
    const [ color, setColor ] = useState('#c45149')
    const [ isColorPick, setColorPick ] = useState(false)

     

    useEffect(() => {
        const response = async () => {
            const sessionData = await axios.get(`https://www.oldmanmcgucket.xyz/api/v1/auth/user/authenticated`, {
                withCredentials: true
            })
            setSession(sessionData.data)
        }

        response()
    }, [])


    const fetchCategories = useCallback(() => {

        const response = async () => {
            const { data } = await axios.get(`https://www.oldmanmcgucket.xyz/api/v1/user/category/getall`, 
                {
                    withCredentials: true
                }
            )
            
            const temp_map = new Map()

            data.map((data: any) => {
                temp_map.set(data.id, data.name)
            })

            setCategoryMap(temp_map)
            setCategories(data)

        }

        response()

    }, [])

    const handleSubmit = async () => {
        if(category.length === 0) {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 500)
        }

        await axios.post(`https://www.oldmanmcgucket.xyz/api/v1/user/category/create`, 
            {
                name: category,
                user_id: session?.user.uid,
                color: color,
                is_default: false
            },
            {
                withCredentials: true
            }
        ).then((data) => {
            toast(data.data.message)
        }).catch((data: AxiosError<MyErrorResponse>) => {
            toast(data.response?.data.message)
        })

        fetchCategories()
    }

    const handleDelete = async (id: string) => {

        console.log(id)

        await axios.delete(`https://www.oldmanmcgucket.xyz/api/v1/user/category/delete`, {
            headers: {
                'id': id
            },
            withCredentials: true
        }).then((data) => {
            toast(data.data.message)
        }).catch((data: AxiosError<MyErrorResponse>) => {
            toast(data.response?.data.message)
        })

        fetchCategories()
    }

    return (
        <>
            <div className='flex flex-row h-screen w-screen'>
                <Toaster />
                <div className={`w-64 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white w-[13rem] md:w-80 flex flex-col h-full`}>
                    <Sidebar />
                </div>
                <div className='flex flex-col justify-start w-full z-0'>
                    <div className='flex flex-col px-10 md:px-40 py-20 border-gray-500 gap-5 md:gap-10'>
                        <div className='flex flex-col gap-5'>
                            <p className='text-slate-800 text-sm md:text-xl'>Name: </p>
                            <input className='text-sm md:text-lg p-2 text-slate-600 border-2 w-48 md:w-96 rounded-lg' value={session?.user.name}></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <p className='text-slate-800 text-sm md:text-xl'>Categories: </p>
                            {
                                categories.map((data: Category) => {
                                    return (
                                        <div className='flex flex-row gap-5'>
                                            <p id={data.id} className='text-sm md:text-lg p-2 text-slate-600 border-2 w-48 md:w-96 rounded-lg'>{data.name}</p>
                                            {
                                                !data.is_default &&
                                                <Trash onClick={() => {handleDelete(data.id)}} className='self-center text-red-600 size-5 hover:cursor-pointer'/>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='flex flex-row gap-5 md:gap-10'>
                            <input type="text" onChange={(e) => {setCategory(e.target.value)}}  className={`text-sm md:text-lg focus:outline-none w-32 md:w-64 rounded-lg border-2 ${ alert ? 'border-red-700' : 'border-slate-300'}`} placeholder='Category name'/>
                            <button onClick={handleSubmit} className='px-2 py-1 md:py-2 md:px-4 bg-green-300 text-sm md:text-lg rounded-lg'>Add</button>
                            <div onClick={() => {setColorPick(!isColorPick)}}
                            style={{ backgroundColor: color }}
                            className={`relative w-56 rounded-lg hover:cursor-pointer`}>
                                {
                                    isColorPick && 
                                    <ChromePicker className='absolute' color={color} onChange={(e) => {
                                        setColor(e.hex)
                                    }}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}