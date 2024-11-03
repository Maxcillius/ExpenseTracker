import Sidebar from '../components/sidebar.tsx'
import { sidebarToggle } from '../atoms/sidebarToggle.ts'
import { useRecoilValue } from 'recoil'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Expenses from '../types/expenses.ts'
import Charts from '../components/ui/charts.tsx'

export default function Analysis() {

    const isSidebar = useRecoilValue(sidebarToggle)
    const [ expenses, setExpenses ] = useState<Expenses[]>([])

     

    useEffect(() => {
        fetchExpenses()
    }, [])


    const fetchExpenses = useCallback(() => {
        const response = async () => {
            try {

                const { data } = await axios.get(`http://3.111.68.152:3000/api/v1/user/expense/getall`,
                    {
                        withCredentials: true
                    }
                )

                setExpenses(data)

            } catch(error) {
                console.log(error)
            }
        }

        response()
    }, [])

    return (
        <>
            <div className='flex flex-row h-screen w-screen'>
                <div className={`w-64 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white w-[13rem] md:w-80 flex flex-col h-full`}>
                    <Sidebar />
                </div>
                <div className='flex flex-col justify-start w-full z-0'>
                    <div>
                        <Charts dataset={expenses}/>
                    </div>
                </div>
            </div>
        </>
    )
}