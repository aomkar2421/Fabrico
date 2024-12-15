import React from 'react';
import { Grid, Box, Avatar, Rating } from '@mui/material';

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        {/* Avatar Section */}
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              R
            </Avatar>
          </Box>
        </Grid>

        {/* Review Content */}
        <Grid item xs={9}>
          <div className="space-y-2">
            {/* Reviewer Name and Date */}
            <div>
              <p className="font-semibold text-lg">Raam</p>
              <p className="text-sm text-gray-500">April 5, 2023</p>
            </div>

            {/* Rating */}
            <Rating value={4.5} precision={0.5} name="half-rating" readOnly />

            {/* Review Text */}
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio illo voluptate quas iure asperiores quis laudantium officia obcaecati assumenda eum! Consectetur aliquid veniam, deleniti commodi neque odit perferendis ipsum saepe?
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
