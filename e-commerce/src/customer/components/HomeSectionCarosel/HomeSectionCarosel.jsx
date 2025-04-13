// import React, { useState } from "react";
// import AliceCarousel from "react-alice-carousel";
// import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import { Button } from "@mui/material";

// const HomeSectionCarosel = ({data, sectionName}) => {

//   const [activeIndex, setActiveIndex] = useState(0);

//   const responsive = {
//     0: { items: 1 },
//     720: { items: 3 },
//     1024: { items: 5.5 },
//   };

//   const slidePrev =()=> setActiveIndex(activeIndex-1);
//   const slideNext =()=> setActiveIndex(activeIndex+1);

//   const syncActiveIndex =({item})=>setActiveIndex(item);

//   const items = data.slice(0,10).map((item) => <HomeSectionCard product={item} />);

//   return (
//     <div className="border rounded-md">

//       <h2 className="text-2xl font-extrabold text-gray-800 py-5 text-start pl-16">{sectionName}</h2>

//       <div className="relative p-5 ">
//         <AliceCarousel
//           items={items}
//           disableButtonsControls
//           responsive={responsive}
//           disableDotsControls
//           onSlideChange={syncActiveIndex}
//           activeIndex={activeIndex}
//         />

//         { activeIndex !== items.length-5 && <Button
//           variant="contained"
//           className="z-50 "
//           onClick={slideNext}
//           sx={{
//             position: "absolute",
//             top: "8rem",  
//             right: "0rem",
//             transform: "translateX(50%) rotate(90deg)",
//             bgcolor: "white",
//           }}
//           aria-label="next"
//         >
//           <KeyboardArrowLeftIcon
//             sx={{ transform: "rotate(90deg)", color: "black" }}
//           />
//         </Button>}

//         { activeIndex !== 0 && <Button
//           variant="contained"
//           className="z-50 "
//           onClick={slidePrev}
//           sx={{
//             position: "absolute",
//             top: "8rem",
//             left: "0rem",
//             transform: "translateX(-50%) rotate(90deg)",
//             bgcolor: "white",
//           }}
//           aria-label="prev"
//         >
//           <KeyboardArrowLeftIcon
//             sx={{ transform: "rotate(-90deg)", color: "black" }}
//           />
//         </Button>}

//       </div>
//     </div>
//   );
// };

// export default HomeSectionCarosel;


import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button, useMediaQuery } from "@mui/material";

const HomeSectionCarosel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  
  // More gradual responsive breakpoints
  const responsive = {
    0: { items: 1 },
    480: { items: 2 },
    720: { items: 3 },
    960: { items: 4 },
    1024: { items: 5 },
    1280: { items: 5.5 },
  };

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.slice(0, 10).map((item) => (
    <div className="px-2 md:px-4">
      <HomeSectionCard product={item} />
    </div>
  ));

  // Calculate visible items based on screen size
  const getVisibleItems = () => {
    if (isMobile) return 1;
    if (isTablet) return 3;
    return 5;
  };
  
  const visibleItems = getVisibleItems();
  const showRightButton = activeIndex !== items.length - visibleItems;
  const showLeftButton = activeIndex !== 0;

  return (
    <div className="border rounded-md w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-bold md:font-extrabold text-gray-800 py-3 md:py-5 text-start pl-4 md:pl-16">
        {sectionName}
      </h2>
      
      <div className="relative px-2 md:px-5 pb-8">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChange={syncActiveIndex}
          activeIndex={activeIndex}
          mouseTracking
        />

        {showRightButton && (
          <Button
            variant="contained"
            onClick={slideNext}
            className="z-50"
            sx={{
              position: "absolute",
              top: "50%",
              right: isMobile ? "0" : "0.5rem",
              transform: "translateY(-50%) rotate(90deg)",
              bgcolor: "white",
              minWidth: "40px",
              width: isMobile ? "32px" : "40px",
              height: isMobile ? "32px" : "40px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ 
                transform: "rotate(90deg)", 
                color: "black",
                fontSize: isMobile ? "1rem" : "1.5rem" 
              }}
            />
          </Button>
        )}

        {showLeftButton && (
          <Button
            variant="contained"
            onClick={slidePrev}
            className="z-50"
            sx={{
              position: "absolute",
              top: "50%",
              left: isMobile ? "0" : "0.5rem",
              transform: "translateY(-50%) rotate(90deg)",
              bgcolor: "white",
              minWidth: "40px",
              width: isMobile ? "32px" : "40px",
              height: isMobile ? "32px" : "40px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon
              sx={{ 
                transform: "rotate(-90deg)", 
                color: "black",
                fontSize: isMobile ? "1rem" : "1.5rem"  
              }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;