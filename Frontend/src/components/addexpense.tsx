import { DatePicker } from "@mui/x-date-pickers"
import { ChevronDown } from 'lucide-react'
import dayjs from "dayjs"
import { useCallback, useEffect, useState } from "react"
import { IndianRupee } from 'lucide-react'
import { categoryAtom, descriptionAtom, amountAtom, dateAtom } from "../atoms/Expense"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import axios, { AxiosError } from "axios"
import Category from "../types/category"
import { categoryNameMap } from "../atoms/Data"
import { categoriesAtom } from "../atoms/Data"
import { Toaster, toast } from "sonner"
import MyErrorResponse from "../types/Error"

export default function AddExpense({getExpenses} : {getExpenses: () => void}) {

    const [ catDropDown, setCatDropDown ] = useState(false)
    const category = useRecoilValue(categoryAtom)
    const [ amount, setAmount ] = useRecoilState(amountAtom)
    const [ descripion, setDescription ] = useRecoilState(descriptionAtom)
    const [ inputDate, setDate ] = useRecoilState(dateAtom)
    const setCategories = useSetRecoilState(categoriesAtom)
    const setCategoryMap = useSetRecoilState(categoryNameMap)
    const [ emptyAmount, setEmptyAmount ] = useState(false)
    const [ emptyCategory, setEmptyCategory ] = useState(false)
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth().toString().length === 1 ? '0' + today.getMonth().toString() : today.getMonth().toString()
    const day = today.getDate().toString().length === 1 ? '0' + today.getDate().toString() : today.getDate().toString()

     

    // Prevent showing alphabets
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
            return
        }
        if ((e.key === 'a' || e.key === 'A') && (e.ctrlKey === true || e.metaKey === true)) {
            return
        }
        if (['Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
            return
        }
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        const today = new Date()

        fetchCategories()
        setDate(today.toDateString())
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

    const handleAdd = async () => {

        if(amount === 0) {
            setEmptyAmount(true)
            setTimeout(() => {
                setEmptyAmount(false)
            }, 1000)
            return
        }
        if(category.name === 'Category') {
            setEmptyCategory(true)
            setTimeout(() => {
                setEmptyCategory(false)
            }, 1000)
            return
        }

       try {

            await axios.post(`http://localhost:3000/api/v1/user/expense/add`,
                {
                    amount: amount,
                    description: descripion,
                    date: inputDate,
                    payment_method: 'Cash',
                    category_id: category.id,
                },
                {
                    withCredentials: true
                }
            ).then((data) => {
                toast(data.data.message)
            }).catch((data: AxiosError<MyErrorResponse>) => {
                toast(data.response?.data.message)
            })

            setAmount(0)
            setDescription('')
            getExpenses()

       } catch(error) {
            console.log(error)
       }

        
    }

    return (
        <div className="h-full w-full">
            <Toaster />
            <div className="flex flex-col justify-between p-4 gap-5">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-2">
                    <div className="flex md:flex-row justify-center gap-2 md:gap-5">
                        <div className="flex flex-col justify-start">
                            <div onClick={() => {setCatDropDown(!catDropDown)}} className={`relative flex flex-col justify-center px-2 w-40 h-full md:px-10 border-2 ${emptyCategory ? 'border-red-600' : 'border-gray-300'} rounded-xl hover:cursor-pointer hover:border-black`}>
                                <div className="flex flex-row text-sm md:text-md justify-center gap-1 md:gap-3">
                                    <p className="flex flex-col justify-center">
                                        {category.name}
                                    </p>
                                    <div className="flex flex-col justify-center">
                                        <ChevronDown />
                                    </div>
                                </div>
                            </div>
                            {
                                catDropDown &&
                                <ShowCategory setCatDropDown={setCatDropDown}/>
                            }
                        </div>
                        <div className="flex flex-col justify-center relative">
                            <IndianRupee className="absolute mx-2 size-5 border-r-2 border-gray-300"/>
                            <input onKeyDown={handleKeyDown} onChange={(e) => {
                                    const re = /^[0-9\b]+$/
                                
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                       setAmount(Number(e.target.value))
                                    }
                            }} value={amount === 0 ? '' : amount} type="number" inputMode="numeric" className={`w-full focus:outline-none ${ emptyAmount ? 'border-2 border-red-700' : ''} hover:border-black text-slate-800 font-semibold pl-8 placeholder="Amount`}></input>
                        </div>
                        <div className="flex flex-col justify-center collapse md:visible">
                            <DatePicker onChange={(e) => {
                                if(e) {
                                    setDate(e?.toDate().toDateString())
                                }
                            }} defaultValue={dayjs(`${year}-${month}-${day}`)} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="flex flex-col justify-center visible md:hidden">
                            <DatePicker onChange={(e) => {
                                
                                if(e) {
                                    setDate(e?.toDate().toDateString())
                                }
                            }} defaultValue={dayjs(`${year}-${month}-${day}`)} />
                        </div>
                        <button onClick={handleAdd} className="text-sm md:text-md py-2 px-10 bg-black text-white font-bold rounded-xl">Add</button>
                    </div>
                </div>
                <textarea onChange={(e) => {setDescription(e.target.value)}} value={descripion} name="description" id="desc" placeholder="description" className="resize-none focus:outline-none outline-none hover:border-black text-slate-700"></textarea>
            </div>
        </div>
    )
}


function ShowCategory({setCatDropDown}: {setCatDropDown: React.Dispatch<React.SetStateAction<boolean>>}) {

    const setCategory = useSetRecoilState(categoryAtom)
    const categories = useRecoilValue(categoriesAtom)

    return (
        <ul className="min-h-fit absolute w-40 max-h-52 z-10 mt-12 md:mt-16 bg-white border-2 border-gray-300 flex flex-col py-4 overflow-y-auto">
            {
                categories.map((data: Category) => {
                    return (
                        <li key={data.id} onClick={() => {
                            setCategory({
                                name: `${data.name}`,
                                id: `${data.id}`
                            })
                            setCatDropDown(false)
                            }
                            }
                             className="text-black text-start pl-8 py-2 text-sm hover:bg-black hover:text-white hover:cursor-pointer">
                                {data.name}
                        </li>
                    )
                })
            }
        </ul>
    )
}