const router = require("express").Router();
 const {
  isAuthenticated,
  extractUserId,
    checkAdminStatus,
  isAdmin

} = require("../middlewares/jwt.middleware"); 
const {
  createPost,
  updatePost,
  deletePost,
  getPostsByCategory,
  getPostDetails,
  LikePost,
  getLikedPosts,
  unlikePost,
  getAllPosts

} = require("../controllers/postsController");


router.get("/allposts", getAllPosts);
router.post("/createpost", isAuthenticated, isAdmin, createPost);
router.get("/:category", getPostsByCategory);
router.get("/details/:postId", getPostDetails);
router.delete("/:postId", deletePost);

/* router.post("/:postId/favorites", isAuthenticated, LikePost);

router.get("/:userId/favorites", getLikedPosts);

router.delete("/:postId/favorites", unlikePost); */


// Move the review route here
const {
  createProductReview,
  getReviewsOnePost,
  deleteReviews
} = require("../controllers/reviewsController");

router.post("/:postId/reviews", isAuthenticated, createProductReview)/* .post(protect, ) */

router.get('/:postId/reviews', getReviewsOnePost) /* .post(protect) */
/*  router.route('/:id', getProductById) */
router.delete('/:postId/reviews/:reviewId?', deleteReviews)

module.exports = router;
