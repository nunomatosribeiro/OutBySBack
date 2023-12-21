const Posts = require("../models/Posts.model");
const User = require("../models/User.model");

/**** Add a Post to wishlist ****/
const addPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.payload._id;
    console.log(req.payload._id, postId, req.params);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { favorites: postId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(user);
  } catch (error) {
    console.log("not possible to add to wishlist", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
/***** get all posts to wishlist *****/
/** get liked Posts **/
const getLikedPosts = async(req, res) => {
  try{
    const { userId } = req.params;
console.log(userId, 'Ver aqui o user id para os posts liked')
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch posts using user's favorites array
    const postsLikedIds = user.favorites;
    const postsLiked = await Post.find({ _id: { $in: user.favorites } });
    res.json(postsLiked);
  } catch (error){
    res.status(500).json({error: 'An error occurred while fetching favorites'})
  }
}

/**Update Favorites */
const updateFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { postId  } = req.body;

    // Update the user's favorites
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { favorites: postId } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


/****  Remove a Post from whishlist****/

const removeAPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.payload._id;
    const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { favorites: postId } },
        { new: true }
      );
    if (!user) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while removing the post." });
  }
};

module.exports = {
  addPost,
  getLikedPosts,
  removeAPost,
  updateFavorites
};
