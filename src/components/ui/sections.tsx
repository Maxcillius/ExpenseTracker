import { LayoutDashboard } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { Store } from 'lucide-react';
import { ChartPie } from 'lucide-react';
import { BadgeRussianRuble } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { FolderSync } from 'lucide-react';
import { Settings } from 'lucide-react';

export default function Sections() {
    return (
        <ul className="flex flex-col justify-center md:gap-1">
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <LayoutDashboard className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>Dashboard</p>
                </div>
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <Wallet className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>My Wallets</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <Store className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>My Stores</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <ChartPie className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>Analysis</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <BadgeRussianRuble className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>Market</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <CreditCard className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>Cards</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <FolderSync className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>Transfer</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                   <Settings className='text-[#81858c] group-hover:text-white size-4 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[10px] md:text-lg'>Setting</p>
                </div>  
            </li>
        </ul>
    )
}