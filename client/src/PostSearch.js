import React, { useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
const PostSearch = () => {
  const [title, setTitle] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    let prod_URL = `http://www.post-app-serverful-prod.xyz/posts/search?title=${title}`
    let dev_URL = `http://posts.com/posts/search?title=${title}`
    try {
      const res = await axios.get(prod_URL);
      setSearchResult(res.data);
      console.log('search result', res.data)
    } catch (error) {
      console.error("Error searching the post by title:", error);
      setSearchResult(null);
    }

    setTitle("");
  };
  

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Search Post by Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Search</button>
      </form>
      {searchResult && (
        <div>
          <h3>Search Result:</h3>
          <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={searchResult.postId} >
            <div className="card-body">
                <h3>{searchResult.title}</h3>
                <CommentList comments={searchResult.comments} />
            </div>
            </div>
        </div>
      )}
    </div>
  );
};
export default PostSearch