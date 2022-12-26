import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { apiUrl, MainTitle, notify } from "../../utils/config";
import { ToastContainer } from "react-toastify";



export default function Home() {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState("");
  const [imgBase64, setImgBase64] = useState("");
  const [profileImage, setProfileImage] = useState("");


  const imgToBase64 = (image) => {
    let base64String = "";
    var reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result;
      setImgBase64(base64String);
      setFormData({ ...formData, postImage: base64String });
    };
    reader.readAsDataURL(image);
  };
  useEffect(() => {
    if (!selectedFile) {
      setProfileImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setProfileImage(objectUrl);
    imgToBase64(selectedFile);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const [formData, setFormData] = useState({
    postTitle: "",
    postDetails: "",
    postImage: "",
    username: session.email,
    fullName: session.name,
  });

  useEffect(() => {
    console.log("formData", formData);
  }, [formData])

  const handleFromData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData['postTitle'].length < 3 || formData['postDetails'].length < 3 || formData['postImage'].length < 3) {
      setServerError(true)
    } else {
      axios
        .post(`/api/post`, formData)
        .then((x) => {
          setServerError([]);
          notify("Post Create success!!");
          router.push("/");
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

  return (
    <>
      <Head>
        <title>OulYas - Blog</title>
      </Head>
      <main>
        <Navbar />
        <ToastContainer />
        <div className="sm:max-w-lg mx-auto mt-6 mb-5">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-2">
              <label for="email" className="text-sm font-semibold text-gray-500">
                Post Title
              </label>
              <input
                type="text"
                id="postTitle"
                name="postTitle"
                className="px-3 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={formData["postTitle"]}
                onChange={(e) => handleFromData(e)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label for="postDetails" className="text-sm font-semibold text-gray-500">
                Post Details
              </label>
              <textarea
                type="postDetails"
                id="postDetails"
                name="postDetails"
                className={`px-3 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                rows="4"
                placeholder="Write your thoughts here..."
                value={formData["postDetails"]}
                onChange={(e) => handleFromData(e)}
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label for="postImage" className="text-sm font-semibold text-gray-500">
                  Post Image
                </label>
              </div>
              <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg"
                onChange={(e) => setSelectedFile(e.target.files[0])} />
            </div>
            <div>
              <button
                type="submit"
                className="mt-3 w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </main>
    </>
  );
}


export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
