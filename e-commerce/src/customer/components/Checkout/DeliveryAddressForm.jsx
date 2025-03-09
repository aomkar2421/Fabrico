import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";
import { getAddressByUser } from "../../../State/Address/Action";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { address } = useSelector((store) => store);

  React.useEffect(() => {
    dispatch(getAddressByUser());
  }, [dispatch]);

  // console.log("CURRENT ORDER BY ID FRONTEND ", order);
  console.log("ALL USER ADRES FRONT END ", address);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit");
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    console.log("ADDRESS :", address);

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  const handleExistingAddress = (selectedAddress) => {
    console.log("Selected existing address:", selectedAddress);

    const address = {
      firstName: selectedAddress.firstName,
      lastName: selectedAddress.lastName,
      streetAddress: selectedAddress.streetAddress,
      city: selectedAddress.city,
      state: selectedAddress.state,
      zipCode: selectedAddress.zipCode,
      mobile: selectedAddress.mobile,
    };
    console.log("=== FIANL SELECTED ADDRESS =====", address);
    const orderData = { address: address, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          // item
          xs={12}
          md={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          {address?.addresses.map((item, index) => (
            <div key={index} className="p-5 py-7 border-b cursor-pointer">
              <AddressCard address={item} />
              <Button
                sx={{ mt: 2, bgcolor: "RGB(145 85 253)", color: "white" }}
                size="large"
                variant="contained"
                onClick={() => handleExistingAddress(item)}
              >
                Deliver Here
              </Button>
            </div>
          ))}
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lasttName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    rows={4}
                    multiline
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{
                      py: 1.5,
                      mt: 2,
                      bgcolor: "RGB(145 85 253)",
                      color: "white",
                    }}
                    size="large"
                    varianr="contained"
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
