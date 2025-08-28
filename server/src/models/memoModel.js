import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  selectedFile: {
    type: String,
    default: '',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  comments: [commentSchema],
  location: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

// Add virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Include virtuals in JSON output
postSchema.set('toJSON', { virtuals: true });

const Post = mongoose.model('Post', postSchema);
export default Post;