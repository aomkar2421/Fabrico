import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { deepPurple } from '@mui/material/colors';


const OrderDetails = () => {
    return (
        <div className='px-5 lg:px-20'>

            <div>
                <h1 className='font-bold text-lg py-10'>Delivery Address</h1>
                <AddressCard />
            </div>

            <div className='py-20'>
                <OrderTracker activeStep={3} />
            </div>

            <Grid container className="space-y-5">

                {
                    [1, 1, 1, 1].map((item) =>
                        <Grid item container className="shadow-xl rounded-md p-5 border" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <Grid item xs={6}>
                                <div className='flex items-center space-x-5'>
                                    <img className='w-[7rem] h-[7rem] object-cover object-top' src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70" />
                                    <div className='space-y-2 ml-5'>
                                        <p className='font-semibold '>Men Slim Mid Rise Black Jeans</p>
                                        <p className='space-x-5 font-semibold opacity-50 text-xs'>
                                            <span>Color: Pink</span>
                                            <span>Size: M</span>
                                        </p>
                                        <p>Seller: Linaria</p>
                                        <p className='font-bold'>₹1099</p>
                                    </div>
                                </div>

                            </Grid>


                            <Grid item>
                                <Box sx={{ color: deepPurple[500] }}>
                                    <StarBorderIcon sx={{ fontSize: '2rem' }} className="px-2" />
                                    <span>Rate & Review Product</span>
                                </Box>
                            </Grid>

                        </Grid>
                    )
                }
            </Grid>


        </div>

    )
}

export default OrderDetails