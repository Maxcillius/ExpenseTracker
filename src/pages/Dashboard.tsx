import AddExpense from '../components/addexpense.tsx';
import Sidebar from '../components/sidebar.tsx';
import Header_Component from '../components/ui/header_component.tsx';
import History from '../components/ui/history.tsx';
import { sidebarToggle } from '../atoms/sidebarToggle.ts';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Expenses from '../types/expenses.ts';

export default function App() {

    const isSidebar = useRecoilValue(sidebarToggle);
    const [ expenses, setExpenses ] = useState<Expenses[]>([]);
    const [ totalExpense, setTotalExpense ] = useState(0);

    useEffect(() => {
        fetchExpenses();
    }, [])


    const fetchExpenses = useCallback(() => {
        const response = async () => {
            try {

                const { data } = await axios.get('http://localhost:3000/api/v1/user/expense/getall',
                    {
                        withCredentials: true
                    }
                );

                setExpenses(data);

                let total = 0;
                data.forEach((info: Expenses) => {
                    total += info.amount;
                })
                setTotalExpense(total);

            } catch(error) {
                console.log(error);
            }
        }

        response();
    }, [])

    return (
        <>
            <div className='flex flex-row h-screen w-screen'>
                <div className={`w-64 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white border-r-2 border-gray-300 w-[13rem] md:w-80 flex flex-col h-full`}>
                    <Sidebar />
                </div>
                <div className='flex flex-col justify-start w-full z-0'>
                    <div className='flex flex-col'>
                        <div className='col-span-4'>
                            <div className='grid grid-rows-1 grid-cols-3'>
                                <Header_Component color='sky' amount={`${totalExpense}`} title='Total Expenses'/>
                                <Header_Component color='red' amount='240,000' title='Total Revnue'/>
                                <Header_Component color='green' amount='160,000' title='Total Revnue'/>
                            </div>
                            <div className='flex flex-col justify-center gap-10 p-5'>
                                <div className='border-2 border-gray-300 rounded-xl'>
                                    <AddExpense getExpenses={fetchExpenses}/>
                                </div>
                                <History transactions={expenses} getExpenses={fetchExpenses}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}