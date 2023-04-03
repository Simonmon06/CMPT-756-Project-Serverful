const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const mongoose =require('mongoose')
const Post = require('./models/post')
const app = express();
app.use(bodyParser.json());
app.use(cors());


// @route   GET /posts
// @desc    Get All Posts
app.get("/posts", async(req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// @route   POST /posts/create
// @desc    Creat a post
// @body    {"title": string}
// @event   Send PostCreated to event-bus
app.post("/posts/create", async (req, res) => {
  // const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  try {
    let post = new Post({title})
    let postId = post._id
    await post.save((err,result) =>{
      if(err){
        console.log('saving post error:------> ', err)
      }
      console.log("Post saved:", post, 'postId: ', postId);
    })


    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        postId,
        title,
      },
    });
    res.status(201).send(post._id);
  } catch (error) {
    console.log(error)
  }



});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

const start = async() =>{
  await mongoose.connect('mongodb://app-mongo-srv:27017/posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Post DB connected"))
  .catch((err) => console.log("DB Error => ", err));
  app.listen(4000, () => {
    console.log('v1')
    console.log("Listening on 4000");
  });
}


start();