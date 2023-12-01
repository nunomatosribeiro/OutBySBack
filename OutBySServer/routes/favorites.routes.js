const router = require("express").Router();
const {
  isAuthenticated,
  extractUserId,
} = require("../middlewares/jwt.middleware");
const {
  addPost,
  getAllPostsWhishlist,
  removeAPost,
} = require("../controllers/favoritesController");
router.use(isAuthenticated);
router.use(extractUserId);

router.get("/wishlist", getAllPostsWhishlist);
router.post('/', addPost)
router.delete('/:postId', removeAPost)


module.exports = router;
