import AddExpense from './components/addexpense';
import Sidebar from './components/sidebar';
import Header_Component from './components/ui/header_component';
import History from './components/ui/history';

export default function App() {
    return (
        <div className='flex flex-row h-screen w-screen'>
            <div className='w-64 collapse md:visible'>
                <Sidebar />
            </div>
            <div className='flex flex-col justify-start border-l-2 border-gray-300 w-full'>
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