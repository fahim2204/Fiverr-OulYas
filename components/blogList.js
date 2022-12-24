import Link from "next/link"

const BlogList = () => {
    return (
        <>
            <div className='flex flex-col rounded-md shadow-md'>
                <Link href={"/"}>
                    <img className='w-auto rounded-t-md shadow mb-1 hover:scale-105 transition duration-300' src="https://cdn.sanity.io/images/cijrdavx/production/05951a0ec1a6ffc54f615ab160649e92fea982d0-800x764.png?rect=0,0,800,468&w=640&q=75&fit=clip&auto=format" alt="blog" height={"250"} />
                </Link>
                <div className='p-2'>
                    <div className="flex my-1 items-center justify-between drop-shadow-md">
                        <div className='flex items-center'>
                            <img className='rounded-full w-6 mr-2' src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&q=75&fit=clip&auto=format" alt="profile" />
                            <div className="text-slate-800 text-sm font-medium"><Link href={"/profile"}>Mario Sanchez</Link></div>
                        </div>
                        <div className="text-slate-400 text-sm">October 21, 2022</div>
                    </div>
                    <h3 className='text-md py-1 font-semibold leading-5 drop-shadow-md truncate mt-2'><Link href={"/blog"}>Architectural Engineering Wonders of the modern era for your Inspiration</Link></h3>
                    <h3 className='text-sm py-1 leading-5 drop-shadow-md line-clamp-2'>Architectural Engineering Wonders of the modern era for your Inspiration Wonders of the modern era for your Inspiration</h3>
                    {/* <span className='text-sm px-2 py-1 font-medium border text-slate rounded-3xl'>Category</span> */}
                    <div className='text-center my-2'><Link href={"/blog"} className='text-sm px-2 py-1 font-medium border border-sky-300 text-sky-300 hover:bg-sky-300 hover:text-white rounded-3xl'>View Post</Link></div>
                </div>
            </div>
        </>
    )
}
export default BlogList