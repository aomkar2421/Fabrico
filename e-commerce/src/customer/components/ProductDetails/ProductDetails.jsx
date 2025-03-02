import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  TextField,
} from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { mens_kurta } from "../../../Data/mens_kurta.js";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action.js";
import { addItemToCart } from "../../../State/Cart/Action.js";
import { createReview, getReviewById } from "../../../State/Review/Action.js";
import { createRating, getRatingById } from "../../../State/Rating/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
// const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [reviewData, setReviewData] = useState("");
  const [ratingData, setRatingData] = useState(0);
  const productId = params.productId;
  
  // const { adminOrder } = useSelector((store) => store);
  const { reviews } = useSelector((store) => store);
  const { ratings } = useSelector((store) => store);

  // console.log(
  //   "============== REVIEWS DATA USING SELECTOR ====================",
  //   reviews
  // );
  // console.log(
  //   "============== RATINGS DATA USING SELECTOR ====================",
  //   ratings
  // );

  // const finalRatings = ratings?.rating;
  // console.log("====FINAL RATINGS=========", finalRatings);
  // const ratingValues = finalRatings.map((item) => item.rating);
  // const totalRating = ratingValues.reduce((sum, rating) => sum + rating, 0);
  // const averageRating = totalRating / finalRatings.length;
  // // const roundedAverageRating = averageRating.toFixed(1);
  // console.log("=============AVG RATING IS ============", averageRating);
  // console.log("=============total RATING IS ============", totalRating);
  // console.log("=============total RATING COUNT IS ============", finalRatings.length);

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((total, item) => total + item.rating, 0);
    // console.log("=============TOTAL RATING IS ============", sum);
    return Number((sum / ratings.length).toFixed(1));
  };

  const averageRating = calculateAverageRating(ratings.ratings);

  const totalRatingCount = ratings?.ratings?.length;
  const totalReviewCount = reviews?.reviews?.length;

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId, dispatch]);

  useEffect(() => {
    console.log("Product ID:", params.productId);
    dispatch(getReviewById(params.productId));
    dispatch(getRatingById(params.productId));
  }, [params.productId, dispatch]);

  const handleAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize.name };
    // console.log("data_ ", data);
    dispatch(addItemToCart(data));

    navigate("/cart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("=============REVIEW===============", reviewData);

    const productId = params.productId;

    await dispatch(
      createReview({
        productId: productId,
        review: reviewData,
      })
    );
    toast.success("Review Added Succesfully");

    // console.log("REVIEW ADDED SUCCESSFULLY");
    setReviewData("");
    dispatch(getReviewById(params.productId));
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    // console.log("=============Rating===============", ratingData);

    const productId = params.productId;
    dispatch(
      createRating({
        productId: productId,
        rating: ratingData,
      })
    );

    // console.log("RATING ADDED SUCCESSFULLY");
    setRatingData(0);
    // toast.success("Rating Added Succesfully");
  };


  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10 ">
          {/* Image gallery */}
          <div className="flex flex-col items-center  ">
            <div className="rounded-lg overflow-hidden max-w-[30rem] max-h-[35rem]">
              <img
                alt={products.product?.id}
                src={products.product?.imageUrl}
                className="h-full w-full object-cover lg:block"
              />
            </div>

            <div className="flex flex-wrap space-x-5 justify-center mt-6">
              {product.images.map((item) => (
                <div className=" overflow-hidden rounded-lg max-w-[6rem] max-h-[6rem]">
                  <img
                    className="h-full w-full object-center object-cover"
                    alt={item.alt}
                    src={item.src}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {products.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl opacity-60 pt-2 text-gray-900">
                {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className="flex items-center space-x-5 text-lg lg:text-xl text-gray-900 mt-6 ">
                <p className="font-semibold">
                  ₹{products.product?.discountedPrice}
                </p>
                <p className="line-through opacity-50">
                  ₹{products.product?.price}
                </p>
                <p className="font-semibold text-gray-500">
                  {products.product?.discountPersent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={averageRating} readOnly />
                  <p className="opacity-50 text-sm">{totalRatingCount} Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {totalReviewCount} Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{ px: "2rem", py: "1rem", bgcolor: "blue", mt: "2rem" }}
                >
                  Add To Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h1 className="font-semibold text-2xl pb-4">
            Recent Review & Rating
          </h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {reviews?.reviews?.map((item) => (
                    <ProductReviewCard review={item} productId={productId} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={5}>
                <div className="mt-5 w-full">
                  <h1 className="font-bold text-2xl ">
                    Post Your Review & Rating
                  </h1>
                  <form action="" onSubmit={handleSubmit}>
                    <div className="h-auto bg-slate-100 rounded-md p-10 my-5 ">
                      <div>
                        <TextField
                          fullWidth
                          id="outline-multiline-static"
                          label="Review"
                          multiline
                          name="review"
                          rows={3}
                          value={reviewData}
                          onChange={(e) => setReviewData(e.target.value)}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="mt-5 bg-blue-700 w-32 h-14 rounded-md text-white font-semibold"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="mt-5 w-full">
                  <h1 className="font-bold text-2xl ">Post Your Rating</h1>
                  <form action="" onSubmit={handleRatingSubmit}>
                    <div className="h-auto bg-slate-100 rounded-md p-10 my-5 ">
                      <div>
                        <Rating
                          value={ratingData}
                          onChange={(e) => setRatingData(e.target.value)}
                          precision={0.5}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="mt-5 bg-blue-700 w-32 h-14 rounded-md text-white font-semibold"
                        >
                          Submit Rating
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>

                <div className="flex items-center space-x-3">
                  <Rating value={4.6} precision={0.5} readOnly />
                  <p className="opacity-60 text-sm">54890 Ratings</p>
                </div>

                <Box className="mt-5">
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p className="">Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", height: 7, borderRadius: 4 }}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-sm text-gray-500">40%</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p className="">Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", height: 7, borderRadius: 4 }}
                        variant="determinate"
                        value={20}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-sm text-gray-500">20%</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p className="">Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", height: 7, borderRadius: 4 }}
                        variant="determinate"
                        value={10}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-sm text-gray-500">10%</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p className="">Average</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", height: 7, borderRadius: 4 }}
                        variant="determinate"
                        value={20}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-sm text-gray-500">20%</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p className="">Poor</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", height: 7, borderRadius: 4 }}
                        variant="determinate"
                        value={10}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-sm text-gray-500">10%</p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section>
          <h1 className="my-10 font-semibold text-2xl">Similar Products</h1>
          <div className="flex flex-wrap space-y-5">
            {mens_kurta.slice(0, 8).map((item) => (
              <HomeSectionCard product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
