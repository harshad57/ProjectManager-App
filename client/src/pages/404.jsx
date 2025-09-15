import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import ErrorAnimation from "../lottie/404.json";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      
      {/* Animation */}
      <div>
        <Lottie animationData={ErrorAnimation} loop autoplay style={{width : 450}} />
      </div>

      {/* Text */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6">
        Oops! Page not found
      </h1>
      <p className="mt-3 text-gray-600 text-base md:text-lg text-center max-w-md font-medium">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;