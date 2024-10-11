import { LayoutDashboard } from 'lucide-react';
import { Settings } from 'lucide-react';
import { ChartPie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sections() {

    return (
        <ul className="flex flex-col justify-center gap-1">
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <Link to={'/dashboard'} className='w-full'>
                    <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                    <LayoutDashboard className='text-[#81858c] group-hover:text-white size-5 md:size-6'/>
                        <p className='text-black group-hover:text-white text-[14px] md:text-lg'>Dashboard</p>
                    </div>
                </Link>
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <Link to={'/analysis'} className='w-full'>
                    <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                    <ChartPie className='text-[#81858c] group-hover:text-white size-5 md:size-6'/>
                        <p className='text-black group-hover:text-white text-[14px] md:text-lg'><Link to={'/analysis'}>Analysis</Link></p>
                    </div>
                </Link>
            </li>
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <Link to={'/settings'} className='w-full'>
                    <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-black rounded-lg md:rouned-2xl group'>
                    <Settings className='text-[#81858c] group-hover:text-white size-5 md:size-6'/>
                        <p className='text-black group-hover:text-white text-[14px] md:text-lg'><Link to={'/settings'}>Settings</Link></p>
                    </div>
                </Link>
            </li>
        </ul>
    )
}