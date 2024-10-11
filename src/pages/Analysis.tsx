import Sidebar from '../components/sidebar.tsx';
import { sidebarToggle } from '../atoms/sidebarToggle.ts';
import { useRecoilValue } from 'recoil';
import Navbar from '../components/navbar.tsx';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Expenses from '../types/expenses.ts';

export default function Analysis() {

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
            <Navbar />
            <div className='flex flex-row h-screen w-screen'>
                <div className={`w-64 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white border-r-2 border-gray-300 w-[13rem] md:w-80 flex flex-col h-full`}>
                    <Sidebar />
                </div>
                <div className='flex flex-col justify-start w-full z-0'>

                </div>
            </div>
        </>
    )
}