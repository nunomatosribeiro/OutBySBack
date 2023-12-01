const router = require("express").Router();
/* const {
  isAuthenticated,
  extractUserId,
} = require("../middlewares/jwt.middleware"); */
const {
  createPost,
  updatePost,
  deletePost,
  getPostsByCategory,
  getPostDetails,
  LikePost,
  getLikedPosts,
  unlikePost
} = require("../controllers/postsController");


/* router.use(isAuthenticated);
router.use(extractUserId); */

router.post("/createpost", createPost)
router.get("/:category", getPostsByCategory);
router.get("/pagedetails/:postId", getPostDetails);
router.delete('/:postId', deletePost)


router.post("/:postId/favorites", LikePost);

router.get("/:userId/favorites", getLikedPosts);

router.delete('/:postId/favorites', unlikePost);

module.exports = router;