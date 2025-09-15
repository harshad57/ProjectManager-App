import { useNavigate } from "react-router-dom"
import Private from "../assets/private.png"
import Public from "../assets/public.png"

export const Projects = () => {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col gap-16 lg:py-34 py-25 min-h-screen px-4 bg-gradient-to-r from-indigo-50 to-indigo-100 items-center">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-12 gap-6 py-4 lg:py-12 px-4 lg:px-8 sm:px-18 sm:py-8 bg-white shadow rounded-xl border-indigo-500 border-3 w-full sm:w-auto">
                <div className="flex flex-col lg:gap-8 gap-4 lg:w-full">
                    <h2 className="text-2xl font-bold text-red-600 p-4 bg-red-100 rounded-xl text-center">Private Projects</h2>
                    <p className="text-gray-500 font-medium text-lg text-center">Your personal projects</p>
                <button onClick={() => navigate("/privateprojects")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer font-medium text-lg hover:bg-indigo-700">View Private</button>
                </div>
                <div className="lg:w-80 w-50">
                    <img src={Private} alt="private projects" />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-12 gap-6 py-4 lg:py-12 px-4 lg:px-8 sm:px-18 sm:py-8 bg-white shadow rounded-xl border-indigo-500 border-3 w-full sm:w-auto">
                <div className="flex flex-col lg:gap-8 gap-4 lg:w-full ">
                    <h2 className="text-2xl font-bold text-green-600 p-4 bg-green-100 rounded-xl text-center">Public Projects</h2>
                    <p className="text-gray-500 font-medium text-lg text-center">Community shared projects</p>
                <button onClick={() => navigate("/publicprojects")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer font-medium text-lg hover:bg-indigo-700">Explore Public</button>
                </div>
                <div className="lg:w-80 w-50">
                    <img src={Public} alt="public projects" />
                </div>
            </div>
        </section>
    )
}