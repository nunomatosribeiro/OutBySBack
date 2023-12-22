const Posts = require("../models/Posts.model");
const User = require("../models/User.model")

 // @desc    Fetch all products
 // @route   GET /api/products
 // @access  Public
 /* const getProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({})

   res.json(products)
 }) */

 // @desc    Fetch single product
 // @route   GET /api/products/:id
 // @access  Public
/*  const getProductById = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id)

   if (product) {
     res.json(product)
   } else {
     res.status(404)
     throw new Error('Product not found')
   }
 }) */

 // @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { rating, comments } = req.body;
  
    // Check if there is a user authenticated
    /*  if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }  */
  
    const product = await Posts.findById(req.params.postId);
  
     /* if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400).json({ error: 'Product already reviewed' });
        return;
      }  */
  
      const review = {
      /*   name: req.user.name, */
        rating: Number(rating),
        comments,
       
        /*  user: req.user._id,  */
      };
  
      // Add the review to the product's reviews array
      product.reviews.push(review);
      product.numReviews = product.reviews.length
     
    const sumOfRatings = product.reviews.reduce((total, review) => total + review.rating, 0);
    product.avgRating = sumOfRatings / product.reviews.length;
      // Save the updated product document
      await product.save();
  
      res.status(201).json({ success: true, review });
    }  /* else {
      res.status(404).json({ error: 'Product not found' });
    } 
  }; */

/* get reviews of that post */
const getReviewsOnePost  = async (req, res) => {

    try {
      const postId  = req.params.postId;
      console.log('Fetching post details for postId:', postId);
      const post = await Posts.findById(postId)
    
      if (post.length === 0) {
        return res.status(404).json({ error: 'No review found for this ID.' });
      }
      console.log('Reviews details:', post);
      res.json(post);
    } catch (error) {
      console.error('Error:', error.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching post details." });
    }
  };
  /** Delete Reviews**/
  const deleteReviews = async (req, res) => {
try{
    const { postId, reviewId } = req.params;

    // Check if the current user is an admin
    if (currentUser.isAdmin) {
      // Find the post by its ID
      const post = await Post.findById(postId);

      // Find the index of the review in the reviews array
      const reviewIndex = post.reviews.findIndex((review) => review._id == reviewId);

      // Check if the review was found
      if (reviewIndex !== -1) {
        // Remove the review from the reviews array
        post.reviews.splice(reviewIndex, 1);

        // Save the updated post
        await post.save();
      res.json({ message: "Post deleted successfully." });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  }  else {
    res.status(403).json({ error: 'Not allowed to delete this review' });
  }
   } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post." });
    }
  }

module.exports = { createProductReview, getReviewsOnePost, deleteReviews }