import { LayoutDashboard } from 'lucide-react'
import { Settings } from 'lucide-react'
// import { ChartPie } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sidebarToggle } from '../../atoms/sidebarToggle'
import { useRecoilState } from 'recoil'

export default function Sections() {

    const navigate = useNavigate()
    const location = useLocation()
    const Title = location.pathname.split('/')[1]
    const [ title, setTitle ] = useState('')
    const [ isSidebar, setSidebar ] = useRecoilState(sidebarToggle)

     

    useEffect(() => {
        setTitle(Title.charAt(0).toUpperCase() + Title.slice(1))
    }, [])

    const handleLogout = async () => {
        await axios.get(`http://3.111.68.152:3000/api/v1/auth/user/signout`, {
            withCredentials: true
        })
        navigate("/auth/signin")
    }

    return (
        <ul className="flex flex-col justify-center gap-1">
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <Link onClick={() => {setSidebar(!isSidebar)}} to={'/dashboard'} className='w-full'>
                    <div className={`flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer ${ title === 'Dashboard' ? 'bg-black' : ''} hover:bg-black rounded-lg md:rouned-2xl group`}>
                    <LayoutDashboard className={`text-[#81858c] ${ title === 'Dashboard' ? 'text-white' : ''} group-hover:text-white size-5 md:size-6`}/>
                        <p className={`text-black ${ title === 'Dashboard' ? 'text-white' : ''} group-hover:text-white text-[14px] md:text-lg`}>Dashboard</p>
                    </div>
                </Link>
            </li>
            {/* <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <Link to={'/analysis'} className='w-full'>
                    <div className={`flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer ${ title === 'Analysis' ? 'bg-black' : ''} hover:bg-black rounded-lg md:rouned-2xl group`}>
                    <ChartPie className={`text-[#81858c] ${ title === 'Analysis' ? 'text-white' : ''} group-hover:text-white size-5 md:size-6`}/>
                        <p className={`text-black ${ title === 'Analysis' ? 'text-white' : ''} group-hover:text-white text-[14px] md:text-lg`}>Analysis</p>
                    </div>
                </Link>
            </li> */}
            <li className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <Link onClick={() => {setSidebar(!isSidebar)}} to={'/settings'} className='w-full'>
                    <div className={`flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer ${ title === 'Settings' ? 'bg-black' : ''} hover:bg-black rounded-lg md:rouned-2xl group`}>
                    <Settings className={`text-[#81858c] ${ title === 'Settings' ? 'text-white' : ''} group-hover:text-white size-5 md:size-6`}/>
                        <p className={`text-black ${ title === 'Settings' ? 'text-white' : ''} group-hover:text-white text-[14px] md:text-lg`}>Settings</p>
                    </div>
                </Link>
            </li>
            <li onClick={handleLogout} className='flex flex-row justify-start gap-3 pl-4 p-1 md:p-2'>
                <div className='flex flex-row justify-start md:pl-10 gap-3 p-2 md:p-4 w-full hover:cursor-pointer hover:bg-red-600 rounded-lg md:rouned-2xl group'>
                <LogOut className='text-[#81858c] group-hover:text-white size-5 md:size-6'/>
                    <p className='text-black group-hover:text-white text-[14px] md:text-lg'>Log out</p>
                </div>
            </li>
        </ul>
    )
}