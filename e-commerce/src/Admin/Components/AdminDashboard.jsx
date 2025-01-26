import { Grid } from "@mui/material";
import React from "react";
import Achivement from "./Achivement";
import MonyhlyOverview from "./MonyhlyOverview";
import { ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import OrdersTableView from "../view/OrderTableView";
import ProductsTableView from "../view/ProductTableView";

const AdminDashboard = () => {
  return (
    <div className="p-10">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achivement />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonyhlyOverview />
        </Grid>
      </Grid>
      <div className="flex w-full overflow-hidden justify-between mt-10">
        <div className="shadow-xl shadow-black">
          <ProductsTableView />
        </div>
        <div className="shadow-xl shadow-black">
          <OrdersTableView />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
