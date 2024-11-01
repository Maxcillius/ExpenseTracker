import User from "./ui/user"
import { Menu } from 'lucide-react'
import { sidebarToggle } from "../atoms/sidebarToggle"
import { useRecoilState } from "recoil"
import { useLocation } from "react-router-dom"


export default function Navbar() {

    const [ sidebar, setSidebar ] = useRecoilState(sidebarToggle)
    const location = useLocation()
    const Title = location.pathname.split('/')[1]

    return (
        <div className="flex flex-row justify-between p-4 border-b-2 border-gray-300">
            <div className="flex flex-row justify-center gap-4">
                <div onClick={() => {setSidebar(!sidebar)}} className='self-center block md:hidden hover:cursor-pointer'>
                    <Menu />
                </div>
                <h1 className="text-xl md:text-3xl font-bold text-black self-center select-none">{Title.charAt(0).toUpperCase() + Title.slice(1)}</h1>
            </div>
            <User />
        </div>
    )
}