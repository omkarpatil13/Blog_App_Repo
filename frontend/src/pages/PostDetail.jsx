import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/post/${id}`);
        console.log(res.data)
        setPost(res.data[0]);
      } catch (err) {
        console.error(err);
        setError("Post not found or server error.");
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!post) return <p>Loading post...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h1>{post.title}</h1>
      <p style={{ color: "#777", fontStyle: "italic" }}>
        By {post.username} on {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div style={{ marginTop: "1.5rem", lineHeight: "1.6" }}>
        {post.content}
      </div>
    </div>
  );
};

export default PostDetails;
