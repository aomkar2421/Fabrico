import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrdersTableView = () => {
  const dispatch = useDispatch();

  const { adminOrder } = useSelector((store) => store);

  // console.log("ADMIN ORDERS -----", adminOrder);

  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.delivered,
    adminOrder.shipped,
    adminOrder.placed,
    adminOrder.deletedOrder,
  ]);

  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  return (
    <div className="overflow-hidden">
      <Card className="mt-2">
        {/* <CardHeader title="Recent Orders" /> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-slate-200 transition-colors dark:bg-slate-800">
              <TableRow className="text-slate-900 transition-colors dark:text-slate-50">
                <TableCell className="text-slate-900 transition-colors dark:text-slate-50">Image</TableCell>
                <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">Title</TableCell>
                <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">Price</TableCell>
                <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white transition-colors dark:bg-slate-700">
              {adminOrder?.orders?.slice(0,5).map((item, index) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {item.orderltems.map((orderItem) => (
                        <Avatar src={orderItem.product.imageUrl}></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">
                    {item.orderltems.map((orderItem) => (
                      <p> {orderItem.product.title}</p>
                    ))}
                  </TableCell>

                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">{item.totalPrice}</TableCell>
                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">
                    {" "}
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
                    </span>{" "}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTableView;
