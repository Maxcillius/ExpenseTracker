import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Expenses from '../../types/expenses';
import { categoryNameMap } from '../../atoms/Data';
import { useRecoilValue } from 'recoil';
import { Trash2 } from 'lucide-react';
import { IndianRupee } from 'lucide-react';
import axios from 'axios';

export default function History({ transactions, getExpenses }: { transactions: Expenses[], getExpenses: () => void }) {

    const [ isDropDown, setDropDown ] = useState(false);
    const categoriesNameMap = useRecoilValue(categoryNameMap);


    const handleDeleteExpense = (id: number) => {
        try {
            const response = async () => {
                await axios.post('http://localhost:3000/api/v1/user/expense/delete', {
                    id: id
                }, 
                {
                    withCredentials: true
                })

                getExpenses();

            }

            response();
        
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="border-2 border-gray-300 rounded-xl p-4">
            <div className="flex flex-row justify-between">
                <h5 className="font-semibold text-black  px-2 py-5 text-md md:text-xl select-none">Expenses</h5>
                <div className="flex flex-col justify-center">
                    <button className='bg-black text-white rounded-lg font-semibold py-1 px-3 md:py-2 md:px-4 flex flex-row justify-center gap-1 md:gap-3 text-sm md:text-md relative' onClick={() => setDropDown(!isDropDown)}>
                        <p className='flex flex-col justify-center'>This Month</p>
                        <div className='flex flex-col justify-center'>
                            <ChevronDown />
                        </div>
                        { isDropDown && 
                            DropDown()
                        }
                        </button>
                </div>
            </div>
            <div className="grid grid-cols-3 auto-rows-auto p-2">
                <div className="flex flex-col justify-start gap-5">
                    <p className="text-slate-500 md:text-lg text-sm font-semibold select-none">Category</p>
                    {

                    }
                    <div className="flex flex-col justify-start gap-3">
                        {
                            transactions.map((data) => {
                                return (
                                    <p key={data.id} className="font-semibold text-slate-700 md:text-lg text-sm">{categoriesNameMap.get(data.category_id)}</p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col justify-start gap-5">
                    <p className="text-slate-500 md:text-lg text-sm font-semibold select-none">Amount</p>
                        <div className="flex flex-col justify-start gap-3">
                            {
                                transactions.map((data) => {
                                    return (
                                        <p key={data.id} className="flex flex-row justify-start font-semibold text-slate-700 md:text-lg text-sm"><IndianRupee size={20} className='flex self-center'/> {data.amount}</p>
                                    )
                                })
                            }
                        </div>
                </div>
                <div className="flex flex-col justify-start gap-5">
                    <p className="text-slate-500 md:text-lg text-sm font-semibold select-none">Date</p>
                        <div className="flex flex-col justify-start gap-3">
                            {
                                transactions.map((data) => {
                                    return (
                                        <div key={data.id} className='flex flex-row justify-between'>
                                            <p className="font-semibold text-slate-700 md:text-lg text-[13px]">{`${data.date}`}</p>
                                            <div className='flex flex-row justify-center gap-10'>
                                                <Trash2 color='red' size={20} className='hover:cursor-pointer md:w-full w-3' onClick={() => {handleDeleteExpense(data.id)}}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </div>
            </div>
        </div>
    )
}

function DropDown() {
    return (
        <>
            <ul className='absolute bg-black mt-9 flex flex-col justify-center overflow-y-scroll w-full h-36'>
                <li>Coming soon</li>
            </ul>
        </>
    )
}