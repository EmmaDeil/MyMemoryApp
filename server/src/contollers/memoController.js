import Post from "../models/memoModel.js";

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postDetails = await Post.findById(postId).populate('creator', 'name email avatar');

    if (!postDetails) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post: postDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await Post.find()
      .populate('creator', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Post.countDocuments();
    const totalPages = Math.ceil(total / limit);
    
    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
      total,
      hasMore: page < totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createpost = async (req, res) => {
  try {
    const { title, message, tags, location } = req.body;
    const userId = req.userId;

    if (!title || !message) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const newPost = new Post({
      title,
      message,
      creator: userId,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim())) : [],
      location,
      selectedFile: req.file ? req.file.path : '',
      likes: [],
      comments: [],
      createdAt: new Date()
    });

    await newPost.save();
    
    // Populate user data before sending response
    await newPost.populate('creator', 'name email avatar');
    
    res.status(201).json({ 
      message: "Post created successfully", 
      post: newPost 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatepost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, message, tags, location } = req.body;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (post.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    const updateData = {
      title: title || post.title,
      message: message || post.message,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim())) : post.tags,
      location: location || post.location,
    };

    if (req.file) {
      updateData.selectedFile = req.file.path;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true })
      .populate('creator', 'name email avatar');

    res.status(200).json({ 
      message: "Post updated successfully", 
      post: updatedPost 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletepost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likepost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const index = post.likes.findIndex((like) => like.toString() === userId);
    
    if (index === -1) {
      // Like the post
      post.likes.push(userId);
    } else {
      // Unlike the post
      post.likes.splice(index, 1);
    }

    const updatedPost = await post.save();
    await updatedPost.populate('creator', 'name email avatar');
    
    res.status(200).json({ 
      message: "Post like updated successfully", 
      post: updatedPost 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};