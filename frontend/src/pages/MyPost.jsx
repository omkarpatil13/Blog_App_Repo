import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("USERNAME");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts/myposts", {
        params: { username }
      });
      setPosts(res.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    console.log(id)
    const token = localStorage.getItem('token');
    if (!token) return alert("Unauthorized");

    try {
      await axios.delete(`http://localhost:5000/api/posts/deletepost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },

      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (id) => {
    // Redirect to edit form (or use modal/inline)
    window.location.href = `/edit/${id}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Blog Posts</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div className="card mb-4 shadow-sm" key={post.id}>
            <div className="card-body">
              <h4 className="card-title"> <Link to={`/post/postdetails/${post.id}`} className="text-decoration-none">
                {post.title}
              </Link></h4>
              <p className="card-text">{post.summary.slice(0, 200)}...</p>
              <p className="card-text">
                <small className="text-muted">
                  By {post.username || 'Unknown'} on {new Date(post.created_at).toLocaleDateString()}
                </small>
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(post.id)}>
                  Edit
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPost;
