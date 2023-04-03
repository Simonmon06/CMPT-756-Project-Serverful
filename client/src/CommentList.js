import React from "react";

const CommentList = ({ comments }) => {
 
  const renderedComments = comments.map((comment) => {
    console.log('frontend- comments',comment)
    return <li key={comment._id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
