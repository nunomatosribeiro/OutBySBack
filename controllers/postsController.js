const Posts = require("../models/Posts.model");
const User = require("../models/User.model");

/****Create a Post ****/
const createPost = async (req, res) => {
  try {
    console.log('User object:', req.payload)
     // Check if the user is an admin
    if (!req.payload.isAdmin ) {
      return res.status(403).json({ error: "Permission denied." });
    } 
   
      const { title, description, category, allMedia,
         fullDescription, info, included } = req.body;
      
      // Create a new post document
      const post = new Posts({
        title,
        description,
        category,
        allMedia,
        fullDescription,
      info,
      included,
      });
  
      // Save the post to the database
      await post.save();
  
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating a post' });
    }
  };
  
/** get Posts **/
const getAllPosts = async (req, res) => {
  try {
    
      const category  = req.params.category;
      const posts = await Posts.find({ category })
    /*   .populate("category") */
      if (posts.length === 0) {
        return res.status(404).json({ error: 'No posts found for this category.' });
      }
      res.json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the posts by category." });
    }
    
};
/****Update a Post ****/

const updatePost = async (req, res) => {
  try {
    const payload = req.body;
    const post = await Posts.findByIdAndUpdate(
      req.params.postId,
      { $set: payload },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the post." });
  }
};

/****  Delete a Post****/

const deletePost = async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
};

/*** Like Post and add to Favorites ***/
const LikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId 
    const user = await User.findById(userId)
     if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    }
     // Check if the post is already in favorites
     if (!user.favorites.includes(postId)) {
      // If not, add it
      user.favorites.push(postId);
      await user.save();

      res.status(200).json({ message: 'Post added to favorites' });
    } else {
      res.status(400).json({ message: 'Post is already in favorites' });
    }

    /* const likesCount = post.likes.length;
    res.status(200).json({ likesCount, message: 'post added to favorites' }); */
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the user profile." });
  }
};
/** get liked Posts **/
const getLikedPosts = async(req, res) => {
  try{
    const userId = req.body.userId ;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch posts using user's favorites array
    const postsLikedIds = user.favorites;
    const postsLiked = await Post.find({ _id: { $in: postsLikedIds } });
    res.json(postsLiked);
  } catch (error){
    res.status(500).json({error: 'An error occurred while fetching favorites'})
  }
}

/****  Unlike a Post****/
const unlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { likes: req.payload._id } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while unliking the post." });
  }
};
/*get posts by category*/
const getPostsByCategory  = async (req, res) => {

  try {
    const category  = req.params.category;
    const posts = await Posts.find({ category })
  /*   .populate("category") */
    if (posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for this category.' });
    }
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the posts by category." });
  }
};
/*get details of post by postId*/
const getPostDetails  = async (req, res) => {

  try {
    const postId  = req.params.postId;
    console.log('Fetching post details for postId:', postId);
    const post = await Posts.findById(postId)
  
    if (post.length === 0) {
      return res.status(404).json({ error: 'No post found for this ID.' });
    }
    console.log('Post details:', post);
    res.json(post);
  } catch (error) {
    console.error('Error:', error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching post details." });
  }
};

module.exports = {
createPost,
updatePost,
deletePost,
getPostsByCategory,
getPostDetails,
LikePost,
getLikedPosts,
unlikePost,
getAllPosts
};