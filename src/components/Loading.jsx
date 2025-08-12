import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Loadingnew.json";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Loading;
