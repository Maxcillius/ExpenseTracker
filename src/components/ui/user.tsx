import avatar from '../../assets/avatar.jpeg';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function User() {

    const [ user, setUser ] = useState('');

    useEffect(() => {
        const handleUserData = async () => {
            const { data } = await axios.get('http://localhost:3000/api/v1/auth/user/authenticated', 
                {
                withCredentials: true
               }
            )

            setUser(data.user.name);
        }

        handleUserData();
    }, [])

    return (
        <div className="flex flex-row justify-around gap-5 md:gap-10">
            <div className="flex flex-col justify-center">
                <Bell className='size-5 md:size-6 hover:cursor-pointer'/>
            </div>
            <div className='flex flex-row justify-center gap-3 select-none'>
                <div>
                    <img src={avatar} alt='avatar' height={100} width={40} className='rounded-full'></img>
                </div>
                <div className="flex flex-col justify-center">
                    <h4 className="font-semibold hidden md:block md:text-md">{user}</h4>
                </div>
            </div>
        </div>
    )
}