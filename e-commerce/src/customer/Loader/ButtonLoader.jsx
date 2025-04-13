import React from "react";
import { Vortex } from "react-loader-spinner";

const ButtonLoader = () => {
  return (
    <Vortex
      visible={true}
      height="24"
      width="24"
      ariaLabel="vortex-loading"
      colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
    />
  );
};

export default ButtonLoader;