const Posts = require("../models/Posts.model");
const User = require("../models/User.model");

/**** Add a Post to wishlist ****/
const addPost = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log(req.payload._id, postId, req.params);
    const post = await Posts.findByIdAndUpdate(
      req.params.postId,
      { $push: { favorites: postId } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    console.log("not possible to add to wishlist", error);
  }
};

/***** get all posts to wishlist *****/
const getAllPostsWhishlist = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);

    let wishlistPostIds = currentUser.favorites;

    const posts = await Posts.find({ _id: { $in: user.favorites } });

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the posts." });
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
  getAllPostsWhishlist,
  removeAPost,
};
