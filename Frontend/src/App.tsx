import AddExpense from './components/addexpense.tsx'
import Sidebar from './components/sidebar.tsx'
import Header_Component from './components/ui/header_component.tsx'
import History from './components/ui/history.tsx'
import { sidebarToggle } from './atoms/sidebarToggle.ts'
import { useRecoilValue } from 'recoil'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Expenses from './types/expenses.ts'
import Charts from './components/ui/charts.tsx'
// import ThresholdProgressBar from '../components/ui/progressBar.tsx'

export default function App() {

    const isSidebar = useRecoilValue(sidebarToggle)
    const [ expenses, setExpenses ] = useState<Expenses[]>([])
    const [ thisMonth, setThisMonth ] = useState(0)
    const [ totalSpent, setTotalSpent ] = useState(0)
    // const [ value, setValue ] = useState(1000)
    // const [ max, setMax ] = useState(1000)

     

    useEffect(() => {
        fetchExpenses()
    }, [])

    const fetchExpenses = useCallback(() => {
        const response = async () => {
            try {

                const { data } = await axios.get(`https://3.111.68.152:3000/api/v1/user/expense/getall`,
                    {
                        withCredentials: true
                    }
                )

                console.log(data)

                setExpenses(data)

                let total = 0
                let thismonth = 0
                const today = new Date()
                const month = today.getMonth()

                data.forEach((info: Expenses) => {
                    const temp = new Date(info.date)
                    if(temp.getMonth() === month) thismonth += info.amount
                    total += info.amount
                })
                setTotalSpent(total)
                setThisMonth(thismonth)

            } catch(error) {
                console.log(error)
            }
        }

        response()
    }, [])

    return (
        <>
            <div className='flex flex-row h-screen w-screen'>
                <div className={`w-56 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white md:w-80 flex flex-col h-screen`}>
                    <Sidebar />
                </div>
                <div className='flex flex-col justify-start z-0 w-full xl:flex-row h-screen'>
                    <div className='flex flex-col w-full'>
                        <div className='col-span-4'>
                            <div className='grid grid-rows-1 grid-cols-2 md:grid-cols-3 md:px-0 px-5'>
                                <Header_Component color='sky' amount={`${thisMonth}`} title='This month'/>
                                <Header_Component color='red' amount={`${totalSpent}`} title='Total Spent'/>
                                {/* <Header_Component color='green' amount={'160,000'} title='Over Threshold'/> */}
                            </div>
                            <div className='flex flex-col justify-center gap-10 p-5'>
                                <div className='border-2 border-gray-300 rounded-xl'>
                                    <AddExpense getExpenses={fetchExpenses}/>
                                </div>
                                <History transactions={expenses} getExpenses={fetchExpenses}/>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col ${ expenses.length === 0 ? 'hidden' : 'block' }`}>
                        <Charts dataset={expenses}/>
                        {/* <div className='flex flex-col justify-center px-5'>
                            <h2 className='pt-4 pb-1 pl-4 font-semibold text-xl'>Threshold</h2>
                            <div className="p-4">
                                <ThresholdProgressBar value={value} max={max}/>
                                <div className='flex flex-row justify-between'>
                                    <p className='py-2 font-semibold text-slate-600'>{value}</p>
                                    <p className='py-2 font-semibold text-slate-600'>{max}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}