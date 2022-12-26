import Head from "next/head";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { ImGoogle3 } from "react-icons/im";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import { loginValidate } from "../lib/validate";

const Login = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };
  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    setServerError(null);
    const status = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: "/",
    });
    setServerError(status.error);
    console.log(status);
    if (status.ok) router.push("/");
  }

  return (
    <>
      <Head>
        <title>OulYas - Login</title>
      </Head>
      <main>
        <div className="flex items-center min-h-screen bg-gray-100 justify-center px-2">
          <div className="overflow-hidden rounded-lg shadow-lg sm:max-w-sm md:mx-auto w-full">
            <div className="p-6 bg-white md:flex-1">
              <h3 className="mb-3 mt-1 text-3xl font-semibold font-rubik text-gray-700 text-center hover:scale-110 transition-all duration-300">
                <Link href={"/"}>OulYas</Link>
              </h3>
              <h3 className="mb-3 mt-1 text-base font-semibold text-gray-700 text-center">
                Welcome Back! Please Login
              </h3>
              <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3">
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-sm font-semibold text-gray-500">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`px-3 py-1 transition duration-300 border ${
                      formik.errors.username && formik.touched.username
                        ? "border-rose-600"
                        : "border-gray-300"
                    } rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                    {...formik.getFieldProps("username")}
                  />
                  <div className="text-rose-600 text-xs mt-1">
                    {formik.errors.username && formik.touched.username && (
                      <div>{formik.errors.username}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-500">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`px-3 py-1 transition duration-300 border ${
                      formik.errors.password && formik.touched.password
                        ? "border-rose-600"
                        : "border-gray-300"
                    } rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                    {...formik.getFieldProps("password")}
                  />
                  <div className="text-rose-600 text-xs mt-1">
                    {formik.errors.password && formik.touched.password && (
                      <div>{formik.errors.password}</div>
                    )}
                  </div>
                </div>
                {serverError && (
                  <div className="text-rose-600 text-sm text-center">{serverError}</div>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                  >
                    Log in
                  </button>
                </div>
                <h3 className="mb-3 mt-1 text-sm font-semibold text-gray-500 text-center">
                  Not Registered?{" "}
                  <Link href={"/register"} className="hover:text-sky-500 cursor-pointer">
                    Register
                  </Link>
                </h3>
                <div className="flex flex-col space-y-5">
                  <span className="flex items-center justify-center space-x-2">
                    <span className="h-px bg-gray-400 w-14"></span>
                    <span className="font-normal text-gray-500">or login with</span>
                    <span className="h-px bg-gray-400 w-14"></span>
                  </span>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={handleGoogleLogin}
                      type="button"
                      className="flex items-center justify-center px-4 py-2 hover:text-white space-x-2 transition-colors duration-300 border text-[#DB4437] border-[#DB4437] rounded-md group hover:bg-[#DB4437] focus:outline-none"
                    >
                      <span>
                        <ImGoogle3 className="text-2xl" />
                      </span>
                    </button>
                    <button
                      onClick={handleFacebookLogin}
                      type="button"
                      className="flex items-center justify-center px-4 py-2 space-x-2 text-blue-500 hover:text-white transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none"
                    >
                      <MdFacebook className="text-2xl" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Login;
