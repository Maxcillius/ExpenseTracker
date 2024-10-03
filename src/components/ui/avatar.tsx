import avatar from '../../assets/avatar.jpeg';

export default function Avatar() {
    return (
        <div className='flex flex-row justify-center gap-3'>
            <div>
                <img src={avatar} alt='avatar' height={100} width={40} className='rounded-full'></img>
            </div>
            <div className="flex flex-col justify-center">
                <h4 className="font-semibold text-sm md:text-md">John cooper</h4>
            </div>
        </div>
    )
}