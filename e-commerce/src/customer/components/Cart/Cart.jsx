// import React, { useEffect, useState } from "react";
// import CartItem from "./CartItem";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart } from "../../../State/Cart/Action";
// import GlobalLoader from "../../Loader/GlobalLoader";
// import ButtonLoader from "../../Loader/ButtonLoader";

// const Cart = () => {
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   const loading = useSelector((state) => state.cart.loading);
//   const dispatch = useDispatch();
//   const [buttonLoader, setButtonLoader] = useState(false);

//   useEffect(() => {
//     dispatch(getCart());
//   }, [cart.updateCartItem, cart.deleteCartItem]);

//   const handleCheckout = () => {
//     setButtonLoader(true);
//     navigate("/checkout?step=2");
//   };

//   return (
//     <div>
//       <div className="lg:grid grid-cols-3 lg:px-16 relative">
//         <div className="col-span-2">
//           <GlobalLoader loading={loading} />
//           {cart.cart?.cartitems.map((item) => (
//             <CartItem item={item} />
//           ))}
//         </div>
//         <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
//           <div className="border p-4">
//             <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
//             <hr />
//             <div className="space-y-3 font-semibold">
//               <div className="flex justify-between pt-3 text-black">
//                 <span>Price</span>
//                 <span>₹{cart.cart?.totalPrice}</span>
//               </div>
//               <div className="flex justify-between pt-3 text-black">
//                 <span>Discount</span>
//                 <span>-₹{cart.cart?.discounte}</span>
//               </div>
//               <div className="flex justify-between pt-3 text-black">
//                 <span>Deliver Charges</span>
//                 <span>Free</span>
//               </div>
//               <hr />
//               <div className="flex justify-between pt-3 text-black font-bold mb-10">
//                 <span>Total Amount</span>
//                 <span>₹{cart.cart?.totalDiscountedPrice}</span>
//               </div>
//               {buttonLoader ? (
//                 <Button
//                 onClick={handleCheckout}
//                 className="w-full"
//                 variant="contained"
//                 sx={{
//                   px: "2rem",
//                   py: "1rem",
//                   bgcolor: "#4545e7",
//                   mt: "2rem",
//                 }}
//               >
//                 <ButtonLoader/>
//               </Button>
//               ) : (
//                 <Button
//                   onClick={handleCheckout}
//                   className="w-full"
//                   variant="contained"
//                   sx={{
//                     px: "2rem",
//                     py: "1rem",
//                     bgcolor: "#4545e7",
//                     mt: "2rem",
//                   }}
//                 >
//                   Checkout
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import GlobalLoader from "../../Loader/GlobalLoader";
import ButtonLoader from "../../Loader/ButtonLoader";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const loading = useSelector((state) => state.cart.loading);
  const dispatch = useDispatch();
  const [buttonLoader, setButtonLoader] = useState(false);
  
  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItem, cart.deleteCartItem, cart.cartItems, cart.cartUpdated ,dispatch]); // Add cart.cartItems to dependency array
  
  const handleCheckout = () => {
    setButtonLoader(true);
    navigate("/checkout?step=2");
  };
  
  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          <GlobalLoader loading={loading} />
          {cart.cart?.cartitems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-4">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>₹{cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Discount</span>
                <span>-₹{cart.cart?.discounte}</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Deliver Charges</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="flex justify-between pt-3 text-black font-bold mb-10">
                <span>Total Amount</span>
                <span>₹{cart.cart?.totalDiscountedPrice}</span>
              </div>
              {buttonLoader ? (
                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  variant="contained"
                  sx={{
                    px: "2rem",
                    py: "1rem",
                    bgcolor: "#4545e7",
                    mt: "2rem",
                  }}
                >
                  <ButtonLoader/>
                </Button>
              ) : (
                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  variant="contained"
                  sx={{
                    px: "2rem",
                    py: "1rem",
                    bgcolor: "#4545e7",
                    mt: "2rem",
                  }}
                >
                  Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;