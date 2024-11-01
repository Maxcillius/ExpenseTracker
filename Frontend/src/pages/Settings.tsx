import Sidebar from '../components/sidebar.tsx'
import { sidebarToggle } from '../atoms/sidebarToggle.ts'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { categoriesAtom } from '../atoms/Data.ts'
import Category from '../types/category.ts'
import axios from 'axios'
import sessionInterface from '../types/session.ts'
import { Trash } from 'lucide-react'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { categoryNameMap } from '../atoms/Data.ts'
import { ChromePicker } from 'react-color'

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
            const sessionData = await axios.get(`http://localhost:3000/api/v1/auth/user/authenticated`, {
                withCredentials: true
            })
            setSession(sessionData.data)
        }

        response()
    }, [])


    const fetchCategories = useCallback(() => {

        const response = async () => {
            const { data } = await axios.get(`http://localhost:3000/api/v1/user/category/getall`, 
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

        await axios.post(`http://localhost:3000/api/v1/user/category/create`, 
            {
                name: category,
                user_id: session?.user.uid,
                color: color,
                is_default: false
            },
            {
                withCredentials: true
            }
        )

        fetchCategories()
    }

    const handleDelete = async (id: string) => {

        console.log(id)

        await axios.delete(`http://localhost:3000/api/v1/user/category/delete`, {
            headers: {
                'id': id
            },
            withCredentials: true
        })

        fetchCategories()
    }

    return (
        <>
            <div className='flex flex-row h-screen w-screen'>
                <div className={`w-64 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white w-[13rem] md:w-80 flex flex-col h-full`}>
                    <Sidebar />
                </div>
                <div className='flex flex-col justify-start w-full z-0'>
                    <div className='flex flex-col px-40 py-20 border-gray-500 gap-10'>
                        <div className='flex flex-col gap-5'>
                            <p className='text-slate-800 text-xl'>Name: </p>
                            <input className='text-lg p-2 text-slate-600 border-2 w-96 rounded-lg' value={session?.user.name}></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <p className='text-slate-800 text-xl'>Categories: </p>
                            {
                                categories.map((data: Category) => {
                                    return (
                                        <div className='flex flex-row gap-5'>
                                            <p id={data.id} className='text-lg p-2 text-slate-600 border-2 w-96 rounded-lg'>{data.name}</p>
                                            {
                                                !data.is_default &&
                                                <Trash onClick={() => {handleDelete(data.id)}} className='self-center text-red-600 size-5 hover:cursor-pointer'/>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='flex flex-row gap-10'>
                            <input type="text" onChange={(e) => {setCategory(e.target.value)}}  className={`focus:outline-none rounded-lg border-2 ${ alert ? 'border-red-700' : 'border-slate-300'}`} placeholder='Category name'/>
                            <button onClick={handleSubmit} className='py-2 px-4 bg-green-300 rounded-lg'>Add</button>
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