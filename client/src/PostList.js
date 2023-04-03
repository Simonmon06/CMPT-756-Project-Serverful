import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import PostCreate from "./PostCreate";
const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");
    console.log('The all query data we have is', res.data)
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    console.log('post.comments, ', post.comments)

    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.postId} onCommentCreate={fetchPosts} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1>Create A Post!!</h1>
      <PostCreate onPostCreate={fetchPosts} />
      <hr />
      <h2>All Posts</h2>
      <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
      </div>
    </div>
    
     
  );
};

export default PostList;
