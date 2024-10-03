export default function Header_Component({ color, amount }: { color: string, amount: string }) {
    return (
        <div className={`flex flex-col rounded-xl bg-${color}-200 shadow-inner px-2 py-1 md:py-5 xl:px-5 xl:py-10 my-3 mx-2 md:m-5 drop-shadow-md`}>
            <h4 className="text-[13px] md:text-sm p-1">Total Revenue</h4>
            <h5 className="text-md md:text-2xl font-semibold p-1">${amount}</h5>
        </div>
    )
}