import React, { useState } from "react";
import axios from "axios";

const PostCreate = ({onPostCreate}) => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let prod_URL = "http://www.post-app-serverful-prod.xyz/posts/create"
    let dev_URL = "http://posts.com/posts/create"
    await axios.post(prod_URL, {
      title,
    });

    setTitle("");
    onPostCreate()
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
