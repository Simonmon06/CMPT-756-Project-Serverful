const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose =require('mongoose')
const Query = require('./models/query')
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.set('useFindAndModify', false);
app.get('/posts', async (req, res) => {
  // res.send(Query);
  let all = await Query.find({})
  res.json(all)
});

app.post('/events', async(req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    try {
      const { postId, title } = data;
      console.log('PostCreated event received is :', data )
      console.log('postId receieved', postId)
      let new_query = new Query({
        postId: postId, 
        title: title,
        comments: []
      })
      await new_query.save();
      console.log("Post without comments saved:", new_query)
    } catch (err) {
      console.error("Error saving the post without comments:", err)
    }
  }

  if (type === 'CommentCreated') {
    try {
      const { commentId, content, postId } = data;
      
      const comment = {
        commentId: commentId,
        content:content
      }
      let updatedQuery = await Query.findOneAndUpdate(
        { postId: postId },
        { $push: { comments: comment } },
        { new: true }
      );
      
      console.log("Comment adding to the post:", comment, 'postId', postId);

      console.log('updated query ', updatedQuery)
      console.log('Query NOW', await Query.find({}))
    } catch (err) {
      console.error("Error adding the comment to the post:", err);
    }
  }
});

// @route   GET /posts/search
// @desc    Search a post by its title
// @query   { title: string }
app.get("/posts/search", async (req, res) => {
  const { title } = req.query;

  try {
    const post = await Query.findOne({ title: title });
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error searching the post by title:", error);
    res.status(500).json({ message: "Server error" });
  }
});


const start = async() =>{
  await mongoose.connect('mongodb://app-mongo-srv:27017/query', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Query DB connected"))
  .catch((err) => console.log("DB Error => ", err));
  app.listen(4002, () => {
    console.log("Listening on 4002");
  });
}

start();