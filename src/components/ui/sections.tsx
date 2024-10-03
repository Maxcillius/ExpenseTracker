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
        <ul className="flex flex-col justify-center gap-1">
            <li className='flex flex-row justify-start gap-3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <LayoutDashboard className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>Dashboard</p>
                </div>
            </li>
            <li className='flex flex-row justify-start gap-3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <Wallet className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>My Wallets</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <Store className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>My Stores</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <ChartPie className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>Analysis</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <BadgeRussianRuble className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>Market</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <CreditCard className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>Cards</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start -3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <FolderSync className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>Transfer</p>
                </div>  
            </li>
            <li className='flex flex-row justify-start gap-3 p-2'>
                <div className='flex flex-row justify-start pl-10 gap-3 p-4 w-full hover:cursor-pointer hover:bg-black rounded-2xl group'>
                   <Settings className='text-[#81858c] group-hover:text-white'/>
                    <p className='text-black group-hover:text-white'>Setting</p>
                </div>  
            </li>
        </ul>
    )
}