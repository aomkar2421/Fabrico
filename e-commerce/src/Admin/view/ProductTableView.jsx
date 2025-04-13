import {
    Avatar,
    Button,
    Card,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { deleteProduct, findProducts } from "../../State/Product/Action";
import GlobalLoader from "../GlobalLoader";
  
  const ProductsTableView = () => {
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products);
    const loading = useSelector((store) => store.products.loading);
  
    console.log("Products ------- ", products);
  
    useEffect(() => {
      const data = {
        category: "",
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 999999,
        minDiscount: 0,
        sort: "price_low",
        pageNumber: 0,
        pageSize: 10,
        stock: "",
      };
      dispatch(findProducts(data));
    }, [products.deletedProduct]);
  
    return (
      <div className="">
        <Card className="mt-2">
          {/* <CardHeader title="Recent Products" /> */}
          <TableContainer className="" component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead className="bg-slate-200 transition-colors dark:bg-slate-800">
                <TableRow className="text-slate-900 transition-colors dark:text-slate-50">
                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50">Image</TableCell>
                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">Title</TableCell>
                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">Category</TableCell>
                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">Price</TableCell>
                  <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-white transition-colors dark:bg-slate-700">
                {/* <GlobalLoader loading={loading}/> */}
                {products?.products?.content?.slice(0,5).map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="right">
                      <Avatar src={item.imageUrl}></Avatar>
                    </TableCell>
                    <TableCell className="text-slate-900 transition-colors dark:text-slate-50" component="th" scope="row">
                      {" "}
                      {item.title}{" "}
                    </TableCell>
  
                    <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">{item.category.name}</TableCell>
                    <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">{item.price}</TableCell>
                    <TableCell className="text-slate-900 transition-colors dark:text-slate-50" align="left">{item.quantity}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    );
  };
  
  export default ProductsTableView;
  
  // {products.products.content.map((item) => (
  //   <TableRow
  //     key={item.name}
  //     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //   >
  //     <TableCell component="th" scope="row">
  //       {item.name}
  //     </TableCell>
  //     <TableCell align="right">{item.id}</TableCell>
  //     {/* <TableCell align="right">{row.fat}</TableCell>
  //     <TableCell align="right">{row.carbs}</TableCell>
  //     <TableCell align="right">{row.protein}</TableCell> */}
  //   </TableRow>
  // ))}
  