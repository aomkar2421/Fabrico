import React, { useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { getOrderById } from '../../../State/Order/Action'
import { createPayment } from '../../../State/Payment/Action'
import GlobalLoader from '../../../Admin/GlobalLoader'
import ButtonLoader from '../../Loader/ButtonLoader'

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const order = useSelector((store)=>store.order);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const [buttonLoader, setButtonLoader] = useState(false);

  useEffect( () => {
    console.log("============ORDER=========", order);
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId])

  const handleCheckout = () =>{
    setButtonLoader(true);
    dispatch(createPayment(orderId));
  }


  return (
    <div>

      <div className='p-5 shadow-lg rounded-md border'>
        <AddressCard address={order.order?.shippingAddress} />
      </div>

      <div>
        <div className="lg:grid grid-cols-3 mt-10 relative">

          <div className="col-span-2">
            {/* {order.order?.orderItems.map((item) => <CartItem item={item} />)} */}
            {order.order?.orderltems.map((item) => <CartItem item={item} />)}
            </div>

          <div className="pl-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-4">
              <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
              <hr />
              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>₹{order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Discount</span>
                  <span>-₹{order.order?.discounte}</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Deliver Charges</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="flex justify-between pt-3 text-black font-bold mb-10">
                  <span>Total Amount</span>
                  <span>₹{order.order?.totalDiscountedPrice}</span>
                </div>
                {
                  buttonLoader?
                  (
                    <Button
                    className='w-full'
                    variant="contained"
                    sx={{ px: "2rem", py: "1rem", bgcolor: "#4545e7", mt: "2rem" }}
                    disabled
                  >
                    <ButtonLoader/>
                  </Button>
                  ):
                  (
                    <Button
                    className='w-full'
                    variant="contained"
                    sx={{ px: "2rem", py: "1rem", bgcolor: "#4545e7", mt: "2rem" }}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OrderSummary