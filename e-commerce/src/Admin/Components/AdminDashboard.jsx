import { Grid } from "@mui/material";
import React from "react";
import Achivement from "./Achivement";
import MonyhlyOverview from "./MonyhlyOverview";
import { ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import OrdersTableView from "../view/OrderTableView";
import ProductsTableView from "../view/ProductTableView";

const AdminDashboard = () => {
  return (
    <>
      <div className="my-10 pb-10 mx-8">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4}>
            <Achivement className="shadow-xl shadow-black"/>
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <MonyhlyOverview className="shadow-xl shadow-black" />
          </Grid>
        </Grid>
        <div className=" my-10 w-full">
          <div className="shadow-md shadow-black rounded-xl">
            <ProductsTableView />
          </div>
          <div className=" my-10 shadow-md shadow-black rounded-xl">
            <OrdersTableView />
          </div>
        </div>
      </div>
    </> 
  );
};

export default AdminDashboard;
