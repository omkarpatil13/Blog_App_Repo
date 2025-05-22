import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setcontent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to create a post.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { title, summary, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Post created successfully!");
      setTitle("");
      setSummary("");
      setcontent("");
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("❌ Failed to create post. Please try again.");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-7">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Summary</label>
              <input
                type="text"
                className="form-control"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">content</label>
              <textarea
                className="form-control"
                rows="6"
                value={content}
                onChange={(e) => setcontent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit Post
            </button>
          </form>
          {message && (
            <div className="alert alert-info mt-3 text-center">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
