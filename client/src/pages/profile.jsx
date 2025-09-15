import React, { useState } from 'react'
import { useUser } from '../context/userProvider';
import UpdateProfile from '../profile/updateprofile';
import Rules from '../profile/rules';
import Privacy from '../profile/privacy';
import Setting from '../profile/setting';
import { useNavigate } from 'react-router-dom';
import ProfileAnimation from '../profile/animation';

export const Profile = () => {
  const { authuser, logout } = useUser();
  const [model, setmodel] = useState(<ProfileAnimation />);
  const [updatemodel, setupdatemodel] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  return (
    <>
      <div onClick={() => { if(updatemodel) {setupdatemodel(false)}}}
        className={`h-screen w-full flex lg:flex-row flex-col transition-all duration-300 bg-gray-50 ${
          updatemodel ? 'blur-sm brightness-75 cursor-none' : ''
        }`}
      >
        <button
            onClick={() => navigate(-1)}
            disabled={updatemodel}
            className={"cursor-pointer px-4 py-2 rounded text-md font-medium text-center text-white transition absolute top-5 right-7 bg-indigo-500 hover:bg-indigo-400 z-50"}
          >
            back
        </button>
        <div className="lg:w-92 lg:h-full bg-indigo-300 lg:border-r-4 border-4 border-indigo-400 shadow-sm text-center flex flex-col items-center relative">

          <div className="mt-10 w-28 h-28 rounded-full border-4 border-indigo-200 bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-sm">
            {authuser?.name?.[0]?.toUpperCase() || 'U'}
          </div>

          <div className="flex gap-2 items-center justify-center mt-4">
            <span className="font-bold text-gray-900 text-xl">
              {authuser?.name || 'User'}
            </span>
            <button
              className="text-sm text-gray-700 hover:bg-indigo-200 border border-indigo-100 py-1 px-2 rounded transition cursor-pointer font-medium"
              onClick={() => setupdatemodel(true)}
            >
              Edit
            </button>
          </div>

          <p className="text-gray-800 text-md mt-2 font-medium">
            {authuser?.email || 'user@example.com'}
          </p>

          <hr className="w-4/5 border-1 border-gray-200 my-6" />

          <div className="flex flex-col w-full gap-2 px-4 text-left">
            <button
              className="py-2 px-3 rounded hover:bg-indigo-200 text-gray-700 font-medium transition cursor-pointer"
              onClick={() => setmodel(<Rules />)}
            >
              Rules & Regulations
            </button>
            <button
              className="py-2 px-3 rounded hover:bg-indigo-200 text-gray-700 font-medium transition cursor-pointer"
              onClick={() => setmodel(<Privacy />)}
            >
              Privacy Policy
            </button>
            <button
              className="py-2 px-3 rounded hover:bg-indigo-200 text-gray-700 font-medium transition cursor-pointer"
              onClick={() => setmodel(<Setting />)}
            >
              Settings
            </button>
          </div>

          <button
            className="bg-red-500 lg:flex hidden hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5 shadow-md transition cursor-pointer"
            onClick={() => { setloading(true); logout; setloading(false); window.location.reload() }}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>

        <div className="flex-1 lg:p-6 py-6 px-3 text-gray-700 bg-gradient-to-r from-indigo-50 to-indigo-100">
          {model && model}
        </div>
      </div>

      {updatemodel && <UpdateProfile setupdatemodel={setupdatemodel} />}
    </>
  );
};
