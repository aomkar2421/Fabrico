import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Button } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10"
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Company{" "}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterButton>
              41, Second Floor, Navjivan Industrial, Society, Near Unique
              Hospital, Khatodara, Laxmi Nagar, Udhna, Surat, Gujarat 395002
              support@ethnicplus.in +917575882020
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterButton>
              support@omcollection.in
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterButton>
              +91 67897 90888
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Ctegories{" "}
          </Typography>
          <div className="flex flex-col">
            <Button className="pb-5" variant="h6" gutterButton>
              Shirt
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              T-Shirt
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Saree
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Top
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Dress
            </Button>
          </div>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Information{" "}
          </Typography>
          <div className="flex flex-col">
            <Button className="pb-5" variant="h6" gutterButton>
              About Us
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Terms & Conditions
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Return & Exchanges
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Shipping & Delivery
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Privacy Policy
            </Button>
          </div>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Useful Links{" "}
          </Typography>
          <div className="flex flex-col">
            <Button className="pb-5" variant="h6" gutterButton>
              Blog
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Contact Us
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              My Account
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              Size Guides
            </Button>
            <Button className="pb-5" variant="h6" gutterButton>
              FAQs
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
