import NumberInput from "./ui/numberInput";
import { DatePicker } from "@mui/x-date-pickers";
import { ChevronDown } from 'lucide-react';
import dayjs from "dayjs";

export default function AddExpense() {
    return (
        <div className="h-full w-full">
            <form action="submit" className="flex flex-col justify-between p-4 gap-5">
                <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div className="flex md:flex-row justify-center gap-5">
                        <div className="flex flex-col justify-center px-2 h-fit py-2 md:h-full md:py-0 self-center md:px-10 border-2 border-gray-300 rounded-2xl hover:cursor-pointer">
                            <div className="flex flex-row text-sm md:text-md justify-center gap-1 md:gap-3">
                                <p className="flex flex-col justify-center">
                                    Category
                                </p>
                                <div className="flex flex-col justify-center">
                                    <ChevronDown />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center w-fit">
                            <NumberInput />
                        </div>
                        <div className="flex flex-col justify-center">
                            <DatePicker defaultValue={dayjs('2022-04-17')} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center bg-black text-white font-bold px-5 rounded-xl">
                        <button className="text-sm md:text-md p-2">Add</button>
                    </div>
                </div>
                <textarea name="description" id="desc" placeholder="description" className="resize-none focus:outline-none outline-none"></textarea>
            </form>
        </div>
    )
}