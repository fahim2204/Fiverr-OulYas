import Link from "next/link"

const BlogList = (props) => {
    const { blog } = props;
    console.log(blog);
    return (
        <>
            <div className='flex flex-col rounded-md shadow-md'>
                <Link href={"/"}>
                    <img className='object-cover h-48 w-96 rounded-t-md shadow mb-1 hover:scale-105 transition duration-300' src={blog.postImage} alt="blog" />
                </Link>
                <div className='p-2'>
                    <div className="flex my-1 items-center justify-between drop-shadow-md">
                        <div className='flex items-center'>
                            <img className='rounded-full w-6 mr-2' src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&q=75&fit=clip&auto=format" alt="profile" />
                            <div className="text-slate-800 text-sm font-medium"><Link href={"/profile"}>{blog.fullName?blog.fullName:"Unknown"}</Link></div>
                        </div>
                        <div className="text-slate-400 text-sm">{new Date(Date.parse(blog.createdAt)).toDateString().slice(4)}</div>
                    </div>
                    <h3 className='text-md py-1 font-semibold leading-5 drop-shadow-md truncate mt-2'><Link href={"/blog"}>{blog.postTitle}</Link></h3>
                    <h3 className='text-sm py-1 leading-5 drop-shadow-md line-clamp-2'>{blog.postDetails}</h3>
                    {/* <span className='text-sm px-2 py-1 font-medium border text-slate rounded-3xl'>Category</span> */}
                    <div className='text-center my-2'><Link href={`blog/${blog._id}`} className='text-sm px-2 py-1 font-medium border border-sky-300 text-sky-300 hover:bg-sky-300 hover:text-white rounded-3xl'>View Post</Link></div>
                </div>
            </div>
        </>
    )
}
export default BlogList