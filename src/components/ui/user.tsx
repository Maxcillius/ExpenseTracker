import Avatar from './avatar'
import { Bell } from 'lucide-react';

export default function User() {
    return (
        <div className="flex flex-row justify-around gap-5 md:gap-10">
            <div className="flex flex-col justify-center">
                <Bell className='size-5 md:size-6 hover:cursor-pointer'/>
            </div>
            <Avatar />
        </div>
    )
}