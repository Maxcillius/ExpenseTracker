import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function History() {

    const [ isDropDown, setDropDown ] = useState(false);
    const transactions = [
        {
            id: 1,
            category: 'Food',
            amount: 60,
            date: '14 Aug 2024'
        },
        {
            id: 2,
            category: 'Clothes',
            amount: 120,
            date: '08 May 2024'
        },
        {
            id: 3,
            category: 'Rent',
            amount: 800,
            date: '26 sept 2024'
        }]

    return (
        <div className="border-2 border-gray-300 rounded-xl p-4">
            <div className="flex flex-row justify-between">
                <h5 className="font-semibold text-black  px-2 py-5 text-md md:text-xl">Expenses</h5>
                <div className="flex flex-col justify-center">
                    <button className="bg-black text-white font-semibold rounded-xl py-1 px-3 md:py-2 md:px-4 flex flex-row justify-center gap-1 md:gap-3 text-sm md:text-md relative" onClick={() => setDropDown(!isDropDown)}>
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
                    <p className="text-slate-500 md:text-lg text-sm font-semibold">Category</p>
                    {

                    }
                    <div className="flex flex-col justify-start gap-3">
                        {
                            transactions.map((data) => {
                                return (
                                    <p className="font-semibold text-slate-700 md:text-lg text-sm">{data.id}. {data.category}</p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col justify-start gap-5">
                    <p className="text-slate-500 md:text-lg text-sm font-semibold">Amount</p>
                        <div className="flex flex-col justify-start gap-3">
                            {
                                transactions.map((data) => {
                                    return (
                                        <p className="font-semibold text-slate-700 md:text-lg text-sm">${data.amount}</p>
                                    )
                                })
                            }
                        </div>
                </div>
                <div className="flex flex-col justify-start gap-5">
                    <p className="text-slate-500 md:text-lg text-sm font-semibold">Date</p>
                        <div className="flex flex-col justify-start gap-3">
                            {
                                transactions.map((data) => {
                                    return (
                                        <p className="font-semibold text-slate-700 md:text-lg text-sm">{data.date}</p>
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
            {/* <ul className='absolute bg-black w-full mt-8 flex flex-col justify-center'>
                <li className='p-2'>Jan</li>
                <li className='p-2'>Feb</li>
                <li className='p-2'>March</li>
                <li className='p-2'>Apr</li>
                <li className='p-2'>May</li>
                <li className='p-2'>Jun</li>
                <li className='p-2'>Jul</li>
                <li className='p-2'>Aug</li>
                <li className='p-2'>Sept</li>
                <li className='p-2'>Oct</li>
                <li className='p-2'>Nov</li>
                <li className='p-2'>Dec</li>

            </ul> */}
        </>
    )
}