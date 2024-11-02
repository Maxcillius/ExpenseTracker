import { IndianRupee } from "lucide-react"

const colorClasses: Record<string, string> = {
    red: 'bg-red-200',
    sky: 'bg-sky-200',
    green: 'bg-green-200',
}

export default function Header_Component({ color, amount, title }: { color: keyof typeof colorClasses, amount: string, title: string }) {
    const bgColorClass = colorClasses[color] || 'bg-gray-200'
    return (
        <div className={`flex flex-col rounded-xl ${bgColorClass} shadow-inner px-2 py-1 md:py-5 xl:px-5 xl:py-10 my-3 mx-2 md:m-5 drop-shadow-md`}>
            <h4 className="text-[13px] md:text-sm p-1 select-none">{title}</h4>
            <h5 className="flex flex-row justify-start text-md md:text-2xl font-semibold p-1"><IndianRupee className='flex self-center size-4 md:size-6'/> {amount}</h5>
        </div>
    )
}
