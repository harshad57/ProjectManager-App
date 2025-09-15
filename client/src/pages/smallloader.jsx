import Lottie from "lottie-react";
import Loader from "../lottie/smallloader.json";

const SmallLoaderPage = () => {
  return (
    <div className="rounded-xl flex items-center justify-center">
        <Lottie animationData={Loader} loop autoplay style={{width: 33}}/>
    </div>
  );
};

export default SmallLoaderPage;