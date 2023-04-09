const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const axios = require("axios");
const mongoose =require('mongoose')
const app = express();

const Comment = require('./models/comment');


app.use(bodyParser.json());
app.use(cors());



// @route   GET /posts/:id/comments
// @desc    Retrieve all comments associated with the given post ID
app.get("/posts/:id/comments", async (req, res) => {
  // res.send(commentsByPostId[req.params.id] || []);
  const postId = req.params.id;

  try {
    const comments = await Comment.findOne({ postId: postId });

    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "Comments not found" });
    }
  } catch (error) {
    console.error("Error fetching comments for the post:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

// @route   POST /posts/:id/comments
// @desc    Create a comment associated with the given post ID
// @body    {"content": string}
// @event   Send CommentCreated to event-bus
app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id
  const { content } = req.body

  try {
    const new_comment = new Comment({
      content: content, 
      postId: postId
    })
    const commentId = new_comment._id

    // save comment to db
    await new_comment.save((err) =>{
      if(err){
        console.log('saving post error:------> ', err)
      }
      console.log("Comment saved to Comment db:", new_comment, 'commentId: ', commentId);
    })
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        commentId: commentId,
        content,
        postId: postId,
      },
    });
    res.status(200).json(new_comment);
  } catch (err) {
    console.error("Error ", err)
  }





  
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);

  res.send({});
});




const start = async() =>{
  console.log('Comments service starts on aws ')
  await mongoose.connect('mongodb://comments-mongo-srv:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Comments DB connected"))
  .catch((err) => console.log("DB Error => ", err));
  app.listen(4001, () => {
    console.log("Listening on 4001");
  });
}


start();