import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import PostCreate from "./PostCreate";
import PostSearch from "./PostSearch";
const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get("http://www.post-app-serverful-prod.xyz/posts");
      if (res.data.length === 0) {
        // Retry fetching posts after 500ms if no posts are found
        setTimeout(fetchPosts, 500);
      } else {
        console.log("The all query data we have is", res.data);
        setPosts(res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);




  const renderedPosts = Object.values(posts).map((post) => {
    console.log('post.comments, ', post.comments)

    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.postId}
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
      <h1>Create A Post!</h1>
      <PostCreate onPostCreate={fetchPosts} />
      <hr />
      <h2>All Posts</h2>
      {posts.length ===0 ? 
                        <div>Please Make a Post. Waiting...</div>: 
                        <div className="d-flex flex-row flex-wrap justify-content-between">
                          {renderedPosts}
                        </div>
                        }
      <h2>Search a Post</h2>
      <PostSearch/>
    </div>
    
     
  );
};

export default PostList;
