import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import MyPost from './pages/MyPost';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    //<h1>demo</h1>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/postdetails/:id" element={<PostDetail />} />
          <Route path="/MyPost" element={<MyPost/>}/>
        </Routes>
     </Router>
  );
}

export default App;
