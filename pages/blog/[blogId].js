import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from "react";
import { BallTriangle } from "react-loader-spinner";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { apiUrl, MainTitle, notify } from "../../utils/config";
import { ToastContainer } from "react-toastify";


export default function BlogByID() {
  const router = useRouter()
  const { blogId } = router.query

  const [serverError, setServerError] = useState(null);


  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    commentDetails: "",
    post: blogId,
    username: session?.email,
    fullName: session?.name,
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePostCommet = async (e) => {
    e.preventDefault();
    if (formData['commentDetails'].length < 3) {
      setServerError(true)
    } else {
      axios
        .post(`/api/comment`, formData)
        .then((x) => {
          setServerError([]);
          notify("Comment Create success!!");
          getComment();
        })
        .catch((e) => {
          if (e.response) {
            setServerError(e.response);
          } else {
            console.log("Error>> ", e);
          }
        });
    }
  }
  const getPost = () => {
    axios
      .get(`/api/post/${blogId}`)
      .then((x) => {
        setIsLoading(false);
        setBlog(x.data.data);
        getComment();
      })
      .catch(() => {
        setIsLoading(true);
        notify("Can't Fetch Images!!");
      });
  }
  const getComment = () => {
    axios
      .get(`/api/comment/${blogId}`)
      .then((x) => {
        console.log(x.data.data)
        setComment(x.data.data);
      })
      .catch(() => {
        notify("Can't Fetch Comment!!");
      });
  }

  useEffect(() => {
    getPost();
  }, []);




  return (
    <>
      <Head>
        <title>OulYas - Blog</title>
      </Head>
      <main>
        <Navbar />
        <ToastContainer />
        <div className='sm:max-w-6xl mx-auto mt-6 grid grid-cols-14 gap-8 mb-5'>
          <div className="col-span-10">
            {isLoading ? (
              <div className="w-full flex justify-center mt-10">
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#4fa94d"
                  ariaLabel="ball-triangle-loading"
                  wrapperClass={{}}
                  wrapperStyle=""
                  visible={true}
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col border rounded-xl shadow px-8 py-4">
                  <h3 className='text-3xl text-center py-1 font-semibold leading-10 drop-shadow-2xl mt-2'>{blog.postTitle}</h3>
                  <div className="flex my-2 items-center justify-center drop-shadow-md">
                    <img className='rounded-full w-12 mr-3' src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&q=75&fit=clip&auto=format" alt="profile" />
                    <div className='flex flex-col'>
                      <div className="text-slate-800 font-medium"><Link href={"/profile"}>{blog.fullName || "Unknown"}</Link></div>
                      <div className="text-slate-400 text-sm">{new Date(Date.parse(blog.createdAt)).toDateString().slice(4)}</div>
                    </div>
                  </div>
                  <img className='w-auto shadow mb-1 mt-5 mx-8' src={blog.postImage} alt="blog" height={"250"} />
                  <div className="desc mt-4 text-justify">{blog.postDetails}</div>
                  <div className="flex justify-center mt-4">
                    <Link href={"/"}>
                      <div className='flex items-center text-blue-600 hover:underline font-semibold'>
                        <BiArrowBack className='mr-2' />
                        View all posts
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col border rounded-xl shadow px-8 py-4 mt-4">
                  <h3 className='font-semibold text-2xl mb-3'>Comments:</h3>
                  {session ? (<div className="flex mb-3">
                    <form onSubmit={handlePostCommet}>
                      <input
                        type="text"
                        id="commentDetails"
                        name="commentDetails"
                        onChange={(e) => handleFormData(e)}
                        value={formData["commentDetails"]}
                        className="p-3 transition duration-300 border flex-grow border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                      <button type="submit" className='bg-green-700 hover:bg-green-600 transition duration-300 font-semibold text-white rounded-md px-3 py-3 ml-4'>Comment</button>
                    </form>
                  </div>) : (<h3 className='mb-3 text-xl font-semibold'>Please <Link className='text-blue-600 hover:text-blue-500 transition duration-300 hover:underline' href={"/login"}>login </Link>to comment</h3>)}
                  <div className="flex flex-col">
                    {comment && <>
                      {comment.map((item) => {
                        return (
                          <>
                            <div className='border py-2 px-4 rounded-md mb-2 shadow'>
                              <div className="flex my-2 items-center drop-shadow-md">
                                <img className='rounded-full w-9 mr-3' src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&q=75&fit=clip&auto=format" alt="profile" />
                                <div className='flex flex-col'>
                                  <div className="text-slate-800 text-sm font-medium"><Link href={"/profile"}>{item.fullName}</Link></div>
                                  <div className="text-slate-400 text-xs">{new Date(Date.parse(blog.createdAt)).toDateString().slice(4)}</div>
                                </div>
                              </div>
                              <h3 className='text-justify'>{item.commentDetails}</h3>
                            </div>
                          </>
                        )
                      })}
                    </>}


                  </div>
                </div>
              </>)}


          </div>
          <div className="col-span-4">
            <div className="flex flex-col">
              <h3 className='text-xl font-bold mb-3'>Recent Post</h3>
              <div className='mb-3'>
                <Link href={"/blog"}>
                  <div className="flex space-x-2 hover:bg-slate-100 transition duration-300 rounded">
                    <img className='h-24 aspect-square object-cover object-center rounded' src="https://cdn.sanity.io/images/cijrdavx/production/b7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg?w=1920&q=75&fit=clip&auto=format" alt="item" />
                    <div className="flex flex-col">
                      <h2 className='leading-5 font-medium line-clamp-3'>This Bread Pudding Will Give You All the Fall Feels</h2>
                      <h3 className='text-sm text-slate-600 mt-1'>October 19, 2022</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='mb-3'>
                <Link href={"/blog"}>
                  <div className="flex space-x-2 hover:bg-slate-100 transition duration-300 rounded">
                    <img className='h-24 aspect-square object-cover object-center rounded' src="https://cdn.sanity.io/images/cijrdavx/production/b7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg?w=1920&q=75&fit=clip&auto=format" alt="item" />
                    <div className="flex flex-col">
                      <h2 className='leading-5 font-medium line-clamp-3'>This Bread Pudding Will Give You All the Fall Feels</h2>
                      <h3 className='text-sm text-slate-600 mt-1'>October 19, 2022</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
