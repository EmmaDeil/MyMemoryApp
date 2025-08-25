import Post from "../models/memoModel.js";

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postDetails = await Post.findById(postId);

    if (!postDetails) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(postDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createpost = async (req, res) => {
  try {
    const { title, desc, tags, images, videos, location } = req.body;
    const user = req.userId; // Assuming userId is set by auth middleware

    if (!title || !desc) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const newPost = new Post({
      title,
      desc,
      user,
      tags: tags ? tags.split(",") : [],
      location,
      images: req.files ? req.files.map((file) => file.path) : [],
      videos: req.videos ? req.videos.map((video) => video.path) : [],
    });

    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatepost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, desc, tags, images, videos, location } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    post.title = title;
    post.desc = desc;
    post.tags = tags ? tags.split(",") : [];
    post.location = location;
    post.images = req.files ? req.files.map((file) => file.path) : [];
    post.videos = req.videos ? req.videos.map((video) => video.path) : [];

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
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

    if (post.user.toString() !== userId) {
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

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((like) => like !== userId);
      post.likeCount -= 1;
    } else {
      post.likes.push(userId);
      post.likeCount += 1;
    }

    await post.save();
    res.status(200).json({ message: "Post liked/unliked successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}