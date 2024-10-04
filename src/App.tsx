import AddExpense from './components/addexpense';
import Sidebar from './components/sidebar';
import Header_Component from './components/ui/header_component';
import History from './components/ui/history';
import { sidebarToggle } from './atoms/sidebarToggle';
import { useRecoilValue } from 'recoil';

export default function App() {

    const isSidebar = useRecoilValue(sidebarToggle);

    return (
        <div className='flex flex-row h-screen w-screen'>
            <div className={`w-64 ${ isSidebar ? 'block' : 'hidden' } md:block absolute md:static z-10 bg-white border-r-2 border-gray-300 w-[13rem] md:w-80 flex flex-col h-full`}>
                <Sidebar />
            </div>
            <div className='flex flex-col justify-start w-full z-0'>
                <div className='flex flex-col'>
                    <div className='col-span-4'>
                        <div className='grid grid-rows-1 grid-cols-3'>
                            <Header_Component color='sky' amount='320,000'/>
                            <Header_Component color='red' amount='240,000'/>
                            <Header_Component color='green' amount='160,000'/>
                        </div>
                        <div className='flex flex-col justify-center gap-10 p-5'>
                            <div className='border-2 border-gray-300 rounded-xl'>
                                <AddExpense />
                            </div>
                            <History />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}