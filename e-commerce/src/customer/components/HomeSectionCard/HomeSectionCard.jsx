// import React from "react";
// import { useNavigate } from "react-router-dom";

// const HomeSectionCard = ({ product }) => {

//   const navigate = useNavigate();

//   return (
//     <div onClick={()=>navigate(`/product/${product.id}`)} className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-9 border">
//       <div className="h-[13rem] w-[10rem]">
//         <img
//           className="object-cover object-top w-full h-full"
//           src={product.imageUrl}
//           alt=""
//         />
//       </div>

//       <div className="p-4">
//         <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
//         <p className="mt-2 text-sm text-gray-500">
//         {product.title}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HomeSectionCard;


import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)} 
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs border transition-transform duration-300 hover:scale-105"
    >
      <div className="h-64 w-full relative">
        <img
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4 w-full">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
          {product.brand}
        </h3>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 line-clamp-2">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;