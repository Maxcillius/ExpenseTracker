import Sections from "./ui/sections"

export default function Sidebar() {
    return (
        <>
            <h1 className="text-lg md:text-2xl font-bold text-black text-center px-2 py-5 md:py-10 select-none">Expense</h1>
            <Sections />
        </>
    )
}