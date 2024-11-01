import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Expenses from '../../types/expenses'
import { categoryNameMap } from '../../atoms/Data'
import { useRecoilValue } from 'recoil'
import { Trash2 } from 'lucide-react'
import { IndianRupee } from 'lucide-react'
import axios from 'axios'

type FilterType = 'Daily' | 'Monthly' | 'Yearly'

interface ExpenseHistoryProps {
    transactions: Expenses[]
    getExpenses: () => void
}

interface GroupedExpenses {
    [key: string]: Expenses[]
}

const ExpenseHistory: React.FC<ExpenseHistoryProps> = ({ transactions, getExpenses }) => {
    const [isDropDown, setDropDown] = useState<boolean>(false)
    const categoriesNameMap = useRecoilValue(categoryNameMap)
    const [expenseID, setExpenseID] = useState<number>(0)
    const [filter, setFilter] = useState<FilterType>('Daily')

     

    // Helper function to safely parse dates
    const parseDate = (date: Date | string): Date => {
        if (date instanceof Date) return date
        return new Date(date)
    }

    // Format date for display
    const formatDate = (date: Date | string): string => {
        const parsedDate = parseDate(date)
        return parsedDate.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Format month for grouping
    const formatMonth = (date: Date | string): string => {
        const parsedDate = parseDate(date)
        return parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        })
    }

    // Format year for grouping
    const formatYear = (date: Date | string): string => {
        const parsedDate = parseDate(date)
        return parsedDate.getFullYear().toString()
    }

    // Group and sort transactions based on selected time period
    const getGroupedTransactions = (): GroupedExpenses => {
        const grouped: GroupedExpenses = {}

        // Sort transactions by date in descending order
        const sortedTransactions = [...transactions].sort((a, b) => 
            parseDate(b.date).getTime() - parseDate(a.date).getTime()
        )

        sortedTransactions.forEach(transaction => {
            let groupKey: string
            
            switch (filter) {
                case 'Monthly':
                    groupKey = formatMonth(transaction.date)
                    break
                case 'Yearly':
                    groupKey = formatYear(transaction.date)
                    break
                default: // Daily
                    groupKey = formatDate(transaction.date)
            }

            if (!grouped[groupKey]) {
                grouped[groupKey] = []
            }
            grouped[groupKey].push(transaction)
        })

        return grouped
    }

    const handleDeleteExpense = async (id: number): Promise<void> => {
        try {
            await axios.post(
                `http://localhost:3000/api/v1/user/expense/delete`, 
                { id }, 
                { withCredentials: true }
            )
            getExpenses()
        } catch(error) {
            console.error('Error deleting expense:', error)
        }
    }

    const filterOptions: FilterType[] = ['Daily', 'Monthly', 'Yearly']
    const groupedTransactions = getGroupedTransactions()

    // Calculate total amount for a group of expenses
    const calculateGroupTotal = (expenses: Expenses[]): number => {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    }

    return (
        <div className="border-2 border-gray-300 rounded-xl p-4">
            <div className="flex flex-row justify-between items-center mb-4">
                <h5 className="font-semibold text-black px-2 text-md md:text-xl select-none">
                    Expenses
                </h5>
                <div className="relative flex flex-col justify-start w-36">
                    <div 
                        onClick={() => setDropDown(!isDropDown)} 
                        className="hover:cursor-pointer flex flex-row justify-between bg-black rounded-lg py-1 px-3 md:py-2 md:px-4"
                    >
                        <button className="bg-black text-white font-semibold flex items-center gap-2 w-full text-center">
                            {filter}
                        </button>
                        <ChevronDown className="text-white"/>
                    </div>
                    {isDropDown && (
                        <ul className="absolute bg-black mt-[44px] flex flex-col justify-center overflow-y-scroll w-full min-h-fit max-h-36 gap-2 py-4 rounded-b-md">
                            {filterOptions.map((filterOption) => (
                                <li 
                                    key={filterOption}
                                    onClick={() => {
                                        setFilter(filterOption)
                                        setDropDown(false)
                                    }} 
                                    className={`hover:bg-white hover:text-black text-center 
                                        ${filter === filterOption ? 'text-black bg-white' : 'text-white'} 
                                        hover:cursor-pointer font-semibold`}
                                >
                                    {filterOption}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="space-y-6 min-h-[200px] max-h-[600px] overflow-y-scroll">
                {Object.keys(groupedTransactions).length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No expenses found
                    </div>
                ) : (
                    Object.entries(groupedTransactions).map(([groupKey, expenses]) => (
                        <div key={groupKey} className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-700">{groupKey}</h3>
                                <p className="text-gray-600 font-medium">
                                    Total: <IndianRupee className="inline mb-1" size={16} />
                                    {calculateGroupTotal(expenses)}
                                </p>
                            </div>
                            {expenses.map((data) => (
                                <div
                                    key={data.id}
                                    className="flex flex-row items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg transition hover:cursor-pointer"
                                    onClick={() => setExpenseID(expenseID === data.id ? 0 : data.id)}
                                >
                                    <div className="flex flex-col justify-center w-full">
                                        <div className="flex flex-row items-center justify-between w-full">
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-slate-700 text-lg">
                                                    {categoriesNameMap.get(data.category_id)}
                                                </p>
                                                {filter === 'Monthly' || filter === 'Yearly' ? (
                                                    <p className="text-slate-500 text-sm">
                                                        {formatDate(data.date)}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <p className="flex items-center font-semibold text-slate-700 text-lg">
                                                    <IndianRupee size={20} className="mr-1" /> {data.amount}
                                                </p>
                                                <Trash2
                                                    color="red"
                                                    size={20}
                                                    className="hover:cursor-pointer"
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation()
                                                        handleDeleteExpense(data.id)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {expenseID === data.id && (
                                            <div className="text-slate-700 pt-5">
                                                {data.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ExpenseHistory