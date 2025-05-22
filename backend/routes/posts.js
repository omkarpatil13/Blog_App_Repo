const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(403);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.sendStatus(403);
  }
}

router.post('/', authMiddleware, (req, res) => {
  const { title, summary,content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

  db.query("INSERT INTO posts (title,summary, content, authorId) VALUES (?, ?, ?, ?)",
    [title,summary, content, req.userId],
    (err) => {
      if (err) return res.status(500).json({ error: "Could not create post" });
      res.json({ message: 'Post created' });
    });
});

router.put('/savepost/:id', authMiddleware, async (req, res) => {
  var postId =  req.params.id;
  const {summary,content } = req.body;
  if (!summary || !content) return res.status(400).json({ error: "Summary and content are required" });

  db.query("UPDATE posts SET summary = ?, content = ? WHERE id = ?", 
    [summary, content, postId],
    (err) => {
      if (err) return res.status(500).json({ error: "Could not create post" });
      res.json({ message: 'Post Updated' });
    });
});
router.get('/', (req, res) => {
  db.query(
    `SELECT posts.*, users.username 
     FROM posts JOIN users ON posts.authorId = users.id 
     ORDER BY posts.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch posts" });
      res.json(results);
    });
});

router.get('/myposts', (req, res) => {
  const username = req.query.username;
  db.query(
    `SELECT posts.*, users.username 
     FROM posts JOIN users ON posts.authorId = users.id 
     WHERE users.username = ?
     ORDER BY posts.created_at DESC`,[username],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch posts" });
      res.json(results);
    });
});

router.get('/post/:id',async (req, res) => {
  const postId = req.params.id;
  try{
  db.query(
    `SELECT posts.*, users.username 
     FROM posts JOIN users ON posts.authorId = users.id 
     WHERE posts.id = ?
     ORDER BY posts.created_at DESC`,[postId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch posts" });
      res.json(results);
    });
  }catch(err){
    console.log(err)
  }
});

router.delete('/deletepost/:id', authMiddleware, (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  db.query("DELETE FROM posts WHERE id = ? AND authorId = ?", [postId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Deletion failed" });
    if (result.affectedRows === 0) return res.status(403).json({ error: "Unauthorized or not found" });
    res.json({ message: "Post deleted successfully" });
  });
});

module.exports = router;
