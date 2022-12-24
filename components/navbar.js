import Link from "next/link"

const Navbar = () => {
    return (
        <>
            <nav className='border-b w-full sticky top-0 z-50 px-6'>
                <div className='sm:max-w-6xl md:mx-auto py-3 flex justify-between'>
                    <h3 className='text-3xl font-bold drop-shadow-lg hover:scale-110 hover:drop-shadow-2xl transition duration-1000'><Link href={"/"}>OulYas</Link></h3>
                    <div className='space-x-2 flex items-center'>
                        <Link href={"/register"} className='border border-sky-600 rounded-sm py-1 px-3 text-sky-600 hover:bg-sky-600 hover:text-white transition duration-300'>Register</Link>
                        <Link href={"/login"} className='border border-green-700 rounded-sm py-1 px-3 text-green-700 hover:bg-green-700 hover:text-white transition duration-300'>Login</Link>
                        {/* <Link href={"/profile"} className='border border-lime-500 rounded-sm py-1 px-3 text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300'>Profile</Link> */}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar