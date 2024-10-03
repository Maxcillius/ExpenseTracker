import User from "./ui/user"

export default function Navbar() {
    return (
        <div className="flex flex-row justify-between p-4 border-b-2 border-gray-300">
            <div className="flex flex-col justify-center">
                <h1 className="text-xl md:text-3xl font-bold text-black">Dashboard</h1>
            </div>
            <User />
        </div>
    )
}