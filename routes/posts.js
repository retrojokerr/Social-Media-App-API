const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Create a new post
router.post('/posts', authenticate, async (req, res) => {
  try {
    const { text, mediaUrl } = req.body;
    const post = new Post({
      text,
      mediaUrl,
      user: req.user.id
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

// List all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Comment on a post
router.post('/comments', authenticate, async (req, res) => {
    try {
      const { text, postId } = req.body;
  
      // Validate input
      if (!text || !postId) {
        return res.status(400).json({ error: 'Text and postId are required' });
      }
  
      const comment = new Comment({
        text,
        user: req.user.id,
        post: postId
      });
  
      // Save the comment to the database
      await comment.save();
  
      // Populate the user info for the notification
      await comment.populate('user', 'name');  // Just use populate() without execPopulate()
  
      // Emit a real-time notification for all connected clients
      req.app.get('io').emit('newComment', {
        text: comment.text,
        postId: comment.post,
        user: comment.user.name,  // Sending the populated user name
        createdAt: comment.createdAt
      });
  
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating comment:', error);  // Log the error for debugging
      res.status(500).json({ error: 'Error creating comment', message: error.message });
    }
  });
  
module.exports = router;