import Sidebar from '../components/sidebar.tsx';
import { sidebarToggle } from '../atoms/sidebarToggle.ts';
import { useRecoilValue } from 'recoil';
import Navbar from '../components/navbar.tsx';

export default function Settings() {

    const isSidebar = useRecoilValue(sidebarToggle);

    return (
        <>
            <Navbar />
            <div className='flex flex-row h-screen w-screen'>
                <div className={`w-64 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white border-r-2 border-gray-300 w-[13rem] md:w-80 flex flex-col h-full`}>
                    <Sidebar />
                </div>
                <div className='flex flex-col justify-start w-full z-0'>
                </div>
            </div>
        </>
    )
}