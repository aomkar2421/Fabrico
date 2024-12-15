import React from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  const handleCheckout = () =>{
    navigate('/checkout?step=2')
  }

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {[1,1,1].map((item)=> <CartItem/> )}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-4">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>₹4697</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Discount</span>
                <span>-₹3419</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Deliver Charges</span>
                <span>Free</span>
              </div>
              <hr/>
              <div className="flex justify-between pt-3 text-black font-bold mb-10">
                <span>Total Amount</span>
                <span>₹1278</span>
              </div>
              <Button
              onClick={handleCheckout}
              className='w-full'
                  variant="contained"
                  sx={{ px: "2rem", py: "1rem", bgcolor: "#4545e7", mt: "2rem" }}
                >
                  Checkout
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart