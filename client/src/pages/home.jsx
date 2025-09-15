import { useUser } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
import Image from "../lottie/image.json"

export const Home = () => {
  const { authuser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    authuser;
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-screen lg:pt-40 pt-25">
        <div className="mx-auto max-w-screen-2xl lg:px-10 px-6 pb-10">

          {/* Hero Section */}
          <section className="flex lg:flex-row items-center justify-between lg:gap-20 gap-12 flex-col">
            {/* Left Text Section */}
            <div className="flex flex-1 flex-col justify-center items-center ">
              <p className="mb-8 text-indigo-600 font-semibold text-2xl">
                Welcome {authuser?.name || "Guest"}
              </p>

              <h1 className="mb-6 font-extrabold text-gray-700 lg:text-6xl lg:leading-20 leading-14 text-center text-5xl">
                Manage Your Projects 
                <span className="text-indigo-600 font-arial"> Smarter & Faster</span>
              </h1>

              <p className="mb-10 text-gray-600 text-xl font-medium leading-9 text-center">
                TaskFlow helps you organize private and public projects, assign
                tasks and collaborate, all in one clean and simple
                dashboard.
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                <a
                  onClick={() => navigate("/addproject")}
                  className="whitespace-nowrap cursor-pointer inline-block rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-indigo-700"
                >
                  Create Project
                </a>

                <a
                  onClick={() => navigate("/privateprojects")}
                  className="whitespace-nowrap cursor-pointer inline-block rounded-lg bg-gray-200 px-8 py-3 text-base font-semibold text-gray-700 shadow-md transition hover:bg-gray-300"
                >
                  View Projects
                </a>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="flex-1 overflow-hidden md:w-[600px] rounded-xl shadow-lg lg:w-[800px]">
              <Lottie
                        animationData={Image}
                        loop
                        autoplay
                      />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
