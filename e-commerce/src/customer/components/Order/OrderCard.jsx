import { Avatar, AvatarGroup, Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item }) => {
  const navigate = useNavigate();
  const orderId = item.id;

  return (
    <div
      onClick={() => navigate(`/account/order/${orderId}`)}
      className="p-5 shadow-md shadow-black hover:shadow-2xl border"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={3}>
          <div className="flex cursor-pointer">
            <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
              {item.orderltems.map((orderItem) => (
                <Avatar src={orderItem.product.imageUrl}></Avatar>
              ))}
            </AvatarGroup>
          </div>
        </Grid>

        <Grid item xs={5}>
          <div className="">
            {item.orderltems.map((orderItem) => (
              <p> {orderItem.product.title}</p>
            ))}
          </div>
        </Grid>

        <Grid item xs={2}>
          {/* <p className="font-semibold">
            <span className="text-gray-800">{item.orderStatus}</span>
          </p> */}
          <span
            className={`text-white px-5 py-2 rounded-full
                  ${
                    item.orderStatus === "CONFIRMED"
                      ? "bg-green-500"
                      : item.orderStatus === "SHIPED"
                      ? "bg-blue-800"
                      : item.orderStatus === "DELIVERED"
                      ? "bg-green-900"
                      : item.orderStatus === "PLACED"
                      ? "bg-blue-500"
                      : item.orderStatus === "PENDING"
                      ? "bg-gray-500"
                      : "bg-red-800"
                  }`}
          >
            {item.orderStatus}
          </span>
        </Grid>

        <Grid item xs={2}>
          <p className="font-semibold">
            {" "}
            Discounted Price :
            <span className="text-gray-800">{item.totalDiscountedPrice}</span>
          </p>
          <p className="font-semibold">
            {" "}
            Total Price :
            <span className="line-through text-red-500">{item.totalPrice}</span>
          </p>
        </Grid>

        {/* <Grid item xs={4}>
          {true && (
            <div>
              <p className="flex items-center text-sm">
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2"
                />
                <span>Delivered On March 03</span>
              </p>
              <p className="text-gray-600 text-sm">
                Your Item Has Been Delivered
              </p>
            </div>
          )}
          {false && (
            <p className="text-sm text-gray-600">
              <span>Expected Delivery On Mar 03</span>
            </p>
          )}
        </Grid> */}
      </Grid>
    </div>
  );
};

export default OrderCard;
