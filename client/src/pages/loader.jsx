import Lottie from "lottie-react";
import Loader from "../lottie/loader.json";

const LoaderPage = () => {
  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center">
      
      {/* Animation */}
      <div>
        <Lottie animationData={Loader} loop autoplay style={{width : 75}} />
      </div>
      <h1 className="text-lg font-bold text-gray-500 mt-2">
        Loading...
      </h1>
    </div>
  );
};

export default LoaderPage;