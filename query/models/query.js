const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: 'Content is required',
  },
}, { timestamps: true });

const querySchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: 'Title is required',
  },
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model("Query", querySchema);