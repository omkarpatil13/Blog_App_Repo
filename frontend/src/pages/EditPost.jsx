import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/post/${id}`);
        const post = res.data[0];
        setTitle(post.title);
        setSummary(post.summary);
        setContent(post.content);
      } catch (error) {
        console.error("Failed to fetch post", error);
        setMessage("❌ Could not load the post.");
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to edit posts.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/posts/savepost/${id}`,
        { summary, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Post updated successfully!");
      setTimeout(() => navigate("/MyPost"), 1000);
    } catch (error) {
      console.error("Update failed", error);
      setMessage("❌ Failed to update post.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Edit Post</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Summary:</label>
            <input
              type="text"
              className="form-control"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content:</label>
            <textarea
              className="form-control"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update Post
          </button>
        </form>
        {message && (
          <div className="alert alert-info mt-3 text-center">{message}</div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
