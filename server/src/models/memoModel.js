import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  likeCount : {
    type: Number,
    default: 0
  },
  images : [
    {
      type: String,
    }
  ],
  videos: [
    {
      type: String,
    }
  ],
  location: {
    type: String,
  },
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);
export default Post;