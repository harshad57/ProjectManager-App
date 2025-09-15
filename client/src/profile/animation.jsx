import Lottie from "lottie-react";
import Profile from "../lottie/profile.json";
import { useUser } from "../context/userProvider";

const ProfileAnimation = () => {
  const { authuser } = useUser();

  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-2xl shadow-md p-8 mt-6 max-w-5xl mx-auto">
      <div className="flex-1 md:pr-10 text-center md:text-left">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back,{" "}
          <span className="font-bold text-indigo-600">
            {authuser?.name || "User"}{" "}
          </span>
          👋
        </h1>
        <p className="mt-6 text-gray-600 text-lg leading-relaxed font-medium text-center">
          This is your personal dashboard. <br />
          Stay organized and keep moving forward with confidence.
        </p>
      </div>

      <div className="flex-1 flex justify-center lg:mt-6 md:mt-0">
        <Lottie
          animationData={Profile}
          loop
          autoplay
          style={{ width: 260 }}
        />
      </div>
    </div>
  );
};

export default ProfileAnimation;
