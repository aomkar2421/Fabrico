import React from "react";
import MainCrosel from "../../components/HomeCarosel/MainCrosel";
import HomeSectionCarosel from "../../components/HomeSectionCarosel/HomeSectionCarosel";
import { mens_kurta } from "../../../Data/mens_kurta";

const HomePage = () => {
  return (
    <div>
      <MainCrosel />
      <div className="py-20 space-y-10 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarosel data={mens_kurta} sectionName="Men's Kurta" />
        <HomeSectionCarosel data={mens_kurta} sectionName="Women's Top" />
        <HomeSectionCarosel data={mens_kurta} sectionName="Men's Jeans" />
        <HomeSectionCarosel data={mens_kurta} sectionName="Womeen's Jeans" />
        <HomeSectionCarosel data={mens_kurta} sectionName="Men's Shoes" />
      </div>
    </div>
  );
};

export default HomePage;
