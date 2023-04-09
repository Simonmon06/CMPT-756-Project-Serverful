import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId , onCommentCreate}) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    // let prod_URL = `http://www.post-app-serverful-prod.xyz/posts/${postId}/comments`
    let prod_URL_aws = `http://www.post-app-serverful.xyz/posts/${postId}/comments`
    // let dev_URL = `http://posts.com/posts/${postId}/comments`
    await axios.post(prod_URL_aws, {
      content,
    });

    setContent("");
    onCommentCreate();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
