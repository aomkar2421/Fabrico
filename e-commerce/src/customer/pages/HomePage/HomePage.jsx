// import React, { useEffect } from "react";
// import MainCrosel from "../../components/HomeCarosel/MainCrosel";
// import HomeSectionCarosel from "../../components/HomeSectionCarosel/HomeSectionCarosel";
// // import { mens_kurta } from "../../../Data/mens_kurta";
// import { useDispatch, useSelector } from "react-redux";
// import { findProducts } from "../../../State/Product/Action";

// const HomePage = () => {
//   const { products } = useSelector((store) => store);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const data = {
//       category: "top",
//       colors: [],
//       sizes: [],
//       minPrice: 0,
//       maxPrice: 9999,
//       minDiscount: 0,
//       sort: "price_low",
//       pageNumber: 0,
//       pageSize: 10,
//       stock: "stock",
//     };

//     console.log("=====HOMEPAGE MENS KURTA ===============", products);

//     dispatch(findProducts(data));
//   }, []);

//   return (
//     <div>
//       <MainCrosel />
//       <div className="py-20 space-y-10 flex flex-col justify-center px-5 lg:px-10">
//       <HomeSectionCarosel data={products.products?.content || []} sectionName="Men's Kurta" />
//       {/* <HomeSectionCarosel data={mens_kurta} sectionName="Women's Top" />
//         <HomeSectionCarosel data={mens_kurta} sectionName="Men's Jeans" />
//         <HomeSectionCarosel data={mens_kurta} sectionName="Womeen's Jeans" />
//         <HomeSectionCarosel data={mens_kurta} sectionName="Men's Shoes" /> */}
//       </div>
//     </div>
//   );
// };

// export default HomePage;



import React, { useEffect, useState } from "react";
import MainCrosel from "../../components/HomeCarosel/MainCrosel";
import HomeSectionCarosel from "../../components/HomeSectionCarosel/HomeSectionCarosel";
// import { mens_kurta } from "../../../Data/mens_kurta";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";

const HomePage = () => {
  const { products } = useSelector((store) => store);
  const dispatch = useDispatch();

    const [mensKurta, setMensKurta] = useState([]);
    const [mensJeans, setMensJeans] = useState([]);
    const [womensTop, setWomensTop] = useState([]);
    const [womensDress, setWomensDress] = useState([]);
    const [womensJeans, setWomensJeans] = useState([]);
  
    const fetchProducts = (category, setState) => {
      const data = {
        category,
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 9999,
        minDiscount: 0,
        sort: "price_low",
        pageNumber: 0,
        pageSize: 10,
        stock: "stock",
      };
    
      dispatch(findProducts(data))
        .then((response) => {
          console.log(category, " HOMEPAGE DATA ", response);
          if (response?.content) {
            setState(response.content);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    };
  
    useEffect(() => {
      fetchProducts("mens_kurta", setMensKurta);
      fetchProducts("top", setWomensTop);
      fetchProducts("women_jeans", setWomensJeans);
      fetchProducts("men_jeans", setMensJeans);
      fetchProducts("Dress", setWomensDress);
    }, []);

  return (
    <div>
      <MainCrosel />
      <div className="py-20 space-y-10 flex flex-col justify-center px-5 lg:px-10">
      <HomeSectionCarosel data={mensKurta || []} sectionName="Men's Kurta" />
      <HomeSectionCarosel data={womensTop || []} sectionName="Women's Top" />
      <HomeSectionCarosel data={womensJeans || []} sectionName="Women's Jeans" />
      <HomeSectionCarosel data={mensJeans || []} sectionName="Men's Jeans" />
      <HomeSectionCarosel data={womensDress || []} sectionName="Women's Dress" />
      </div>
    </div>
  );
};

export default HomePage;
