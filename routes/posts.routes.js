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
router.post("/createpost",  /*isAuthenticated, isAdmin, */ createPost);
router.get("/:category", getPostsByCategory);
router.get("/details/:postId", getPostDetails);
router.delete("/:postId", deletePost);


const {
  createProductReview,
  getReviewsOnePost,
  deleteReviews
} = require("../controllers/reviewsController");

router.post("/:postId/reviews", isAuthenticated, createProductReview)/* .post(protect, ) */

router.get('/:postId/reviews', getReviewsOnePost)
router.delete('/:postId/reviews/:reviewId?', deleteReviews)

module.exports = router;
