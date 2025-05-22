import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
        setFilteredPosts(res.data); // Initial filtered list = all posts
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Blog Posts</h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="alert alert-info text-center">No matching posts found.</div>
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">{post.title}</h3>
              <p className="card-text">{post.summary.slice(0, 150)}...</p>
              <p className="text-muted fst-italic mb-0">
                By {post.username} on {new Date(post.created_at).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-end mt-3">
                <a href={`/post/postdetails/${post.id}`} className="btn btn-outline-primary btn-sm">
                  View More
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
