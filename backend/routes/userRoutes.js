const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userControllers');

router
  .route('/register')
  .post(registerUser);

  router
  .route('/login')
  .post(loginUser);

// router
//   .route('/:id')
//   .delete(deleteTransaction);

module.exports = router;