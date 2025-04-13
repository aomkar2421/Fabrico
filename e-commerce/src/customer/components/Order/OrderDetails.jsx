import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { useNavigate, useParams } from "react-router-dom";
import { getAddressByOrder } from "../../../State/Address/Action";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);
    const address = useSelector((state) => state.address);
    
    const params = useParams();
    const navigate = useNavigate();
    // console.log("ORDER ID IS ======", params.orderId);

    useEffect(() => {
        dispatch(getOrderById(params.orderId));
        dispatch(getAddressByOrder(params.orderId))
    }, [dispatch, params.orderId]);

    // console.log("CURRENT ORDER BY ID FRONTEND ", order);
    console.log("CURREBT ORDER ADRES FRONT END ", address);

    return (
        <div className="px-5 lg:px-20">
            <div>
                <h1 className="font-bold text-lg py-10">Delivery Address</h1>
                <AddressCard address={address?.address} />
            </div>

            <div className="py-20">
                <OrderTracker activeStep={3} />
            </div>

            <Grid container className="space-y-5">
                {order?.order?.orderltems.map((item) => (
                    <Grid
                        item
                        container
                        className="shadow-xl rounded-md p-5 border"
                        sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                        <Grid item xs={6}>
                            <div className="flex items-center space-x-5">
                                <img alt=""
                                    className="w-[7rem] h-[7rem] object-cover object-top cursor-pointer"
                                    src={item?.product?.imageUrl}
                                    onClick={() => navigate(`/product/${item.product.id}`)}
                                />
                                <div className="space-y-2 ml-5">
                                    <p className="font-semibold ">
                                    {item?.product?.title}
                                    </p>
                                    <p className="space-x-5 font-semibold opacity-50 text-xs">
                                        <span>Color: {item?.product?.color}</span>
                                        <span>Size: {item?.size}</span>
                                    </p>
                                    <p>Seller: {item?.product?.brand}</p>
                                    <p className="font-bold">₹{item?.product?.discountedPrice}</p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item>
                            <Box sx={{ color: deepPurple[500] }} className="cursor-pointer">
                                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                                <span onClick={() => navigate(`/product/${item.product.id}`)}>Rate & Review Product</span>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default OrderDetails;
