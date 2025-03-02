// import React, { useEffect } from 'react';
// import { Grid, Box, Avatar, Rating } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRatingByUser } from '../../../State/Rating/Action';

// const ProductReviewCard = ({review, productId}) => {
//   const dispatch = useDispatch();

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short", // "Jan"
//       year: "numeric",
//     });
//   };
  
//   const { ratings } = useSelector((store) => store);
//   console.log("===== REVIEW CARD RATING BY USER AND PRODUCT ========", ratings);
//   useEffect(()=>{
//     // console.log("=== PRODUCT REVIEW productId====", productId);
//     // console.log("=== PRODUCT REVIEW userId====", review.user.id);
//     const data = { productId: productId, userId : review.user.id };
//     dispatch(getRatingByUser(data))
//   },[])

//   return (
//     <div>
//       <Grid container spacing={2} gap={3}>
//         {/* Avatar Section */}
//         <Grid item xs={1}>
//           <Box>
//             <Avatar
//               className="text-white"
//               sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
//             >
//               {review.user.firstName[0].toUpperCase()}
//             </Avatar>
//           </Box>
//         </Grid>

//         {/* Review Content */}
//         <Grid item xs={9}>
//           <div className="space-y-2">
//             {/* Reviewer Name and Date */}
//             <div>
//               <p className="font-semibold text-lg"> {review.user.id} {review.user.firstName}</p>
//               <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
//             </div>

//             {/* Rating */}
//             <Rating value={4.5} precision={0.5} name="half-rating" readOnly />

//             {/* Review Text */}
//             <p className="text-gray-700">
//               {review.review}
//             </p>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default ProductReviewCard;



import React, { useEffect } from 'react';
import { Grid, Box, Avatar, Rating, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getRatingByUser } from '../../../State/Rating/Action';

const ProductReviewCard = ({ review, productId }) => {
  const dispatch = useDispatch();
  const { ratings } = useSelector((store) => store);
  
  const userId = review.user.id;
  const userRating = ratings.userRatings[userId]?.rating || 0;
  const isLoading = ratings.loadingUserRatings[userId];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  
  useEffect(() => {
    const data = { 
      productId: productId, 
      userId: userId
    };
    dispatch(getRatingByUser(data));
  }, [dispatch, productId, userId]);

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
              {review.user.firstName[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>

        {/* Review Content */}
        <Grid item xs={9}>
          <div className="space-y-2">
            {/* Reviewer Name and Date */}
            <div>
              <p className="font-semibold text-lg">{review.user.firstName}</p>
              <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
            </div>

            {/* Rating */}
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <Rating 
                value={userRating} 
                precision={0.5} 
                name={`rating-${userId}`}
                readOnly 
              />
            )}

            {/* Review Text */}
            <p className="text-gray-700">
              {review.review}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;