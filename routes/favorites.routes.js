const router = require("express").Router();
 const {
  isAuthenticated,
  extractUserId,
} = require("../middlewares/jwt.middleware"); 
const {
  addPost,
  getLikedPosts,
  removeAPost,
  updateFavorites
} = require("../controllers/favoritesController");
const {
  updateUserData
} = require("../controllers/userController");
 router.use(isAuthenticated);
router.use(extractUserId); 

router.get("/:userId", getLikedPosts);
router.post('/:userId', addPost)
router.put('/:userId', updateFavorites);
router.delete('/:postId', removeAPost)


module.exports = router;
