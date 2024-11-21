const express = require('express');
const passport = require('passport');
const User = require('../models/user'); // User 모델을 가져옵니다.

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// POST /auth/signup
router.post('/signup', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/checkId
router.get('/checkId', async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findOne({ userId: id });
    if (user) {
      return res.status(409).json({ responseMessage: '이미 가입한 아이디 입니다.' });
    }
    return res.status(200).json({ responseMessage: '사용할 수 있는 아이디입니다.' });
  } catch (error) {
    console.error("아이디 중복 확인 에러:", error);
    return res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
});

module.exports = router;
