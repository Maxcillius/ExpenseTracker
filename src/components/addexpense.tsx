import NumberInput from "./ui/numberInput";
import { DatePicker } from "@mui/x-date-pickers";
import { ChevronDown } from 'lucide-react';
import dayjs from "dayjs";

export default function AddExpense() {
    return (
        <div className="h-full w-full">
            <form action="submit" className="flex flex-col justify-between p-4 gap-5">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-2">
                    <div className="flex md:flex-row justify-center gap-2 md:gap-5">
                        <div className="flex flex-col justify-center px-2 w-40 md:h-full md:px-10 border-2 border-gray-300 rounded-xl md:rounded-2xl hover:cursor-pointer hover:border-black">
                            <div className="flex flex-row text-sm md:text-md justify-center gap-1 md:gap-3">
                                <p className="flex flex-col justify-center">
                                    Category
                                </p>
                                <div className="flex flex-col justify-center">
                                    <ChevronDown />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <NumberInput />
                        </div>
                        <div className="flex flex-col justify-center collapse md:visible">
                            <DatePicker defaultValue={dayjs('2022-04-17')} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <div className="flex flex-col justify-center visible md:hidden">
                            <DatePicker defaultValue={dayjs('2022-04-17')} />
                        </div>
                        <button className="text-sm md:text-md py-2 px-10 bg-black text-white font-bold rounded-xl">Add</button>
                    </div>
                </div>
                <textarea name="description" id="desc" placeholder="description" className="resize-none focus:outline-none outline-none hover:border-black text-slate-700"></textarea>
            </form>
        </div>
    )
}