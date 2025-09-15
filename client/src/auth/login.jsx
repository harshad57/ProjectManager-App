import React, { useState } from "react";
import { useUser } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import SmallLoaderPage from "../pages/smallloader";
import toast from "react-hot-toast";
import Bg from "../assets/bg.jpg";

export const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const { login } = useUser();

    const send = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            const res = await login({ email, password });
            toast.success(res.message);
            navigate('/');
            window.location.reload();
        } catch (err) {
            toast.error(err);
        } finally {
            setloading(false);
        }
    }
    return (
        <>
            <div className="absolute inset-0">
                <img
                    src={Bg}
                    alt="Background"
                    className="w-full h-full object-cover blur-sm brightness-85"
                />
            </div>
            <div className="bg-white py-8">
                <div className="md:w-[500px] sm:w-[400px] w-full max-w-screen-2xl px-4 md:px-8 absolute top-80 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

                    <form method="post" onSubmit={send} className="rounded-lg border">
                        <div className="flex flex-col gap-4 p-6 md:p-8 backdrop-blur-md">
                            <div>
                                <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                                <input name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" type="email" value={email} onChange={(e) => setemail(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
                                <input name="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" type="text" value={password} onChange={(e) => setpassword(e.target.value)} required />
                            </div>

                            <button className="block rounded-lg bg-gray-800 px-8 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base cursor-pointer h-12 mt-4" type="submit" disabled={loading}>{loading ? <SmallLoaderPage /> : "Login"}</button>

                        </div>
                        <div className="flex items-center justify-center bg-gray-100 p-4">
                            <div className="text-center text-sm text-gray-500">Don't have an account ? <div onClick={() => navigate('/register')} className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700 cursor-pointer">Register</div></div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}