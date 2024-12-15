import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'

const OrderSummary = () => {
  return (
    <div>

      <div className='p-5 shadow-lg rounded-md border'>
        <AddressCard />
      </div>

      <div>
        <div className="lg:grid grid-cols-3 mt-10 relative">

          <div className="col-span-2">
            {[1, 1, 1].map((item) => <CartItem />)}
          </div>

          <div className="pl-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
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
                <hr />
                <div className="flex justify-between pt-3 text-black font-bold mb-10">
                  <span>Total Amount</span>
                  <span>₹1278</span>
                </div>
                <Button
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

    </div>
  )
}

export default OrderSummary