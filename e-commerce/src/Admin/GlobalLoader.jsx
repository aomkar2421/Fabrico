// src/components/common/GlobalLoader.jsx
import React from "react";
import { Vortex } from "react-loader-spinner";

const GlobalLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex justify-center items-center">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        colors={['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF']}
      />
    </div>
  );
};

export default GlobalLoader;