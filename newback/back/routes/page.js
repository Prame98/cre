const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {
  renderProfile, renderJoin, renderMain, renderHashtag,
} = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
  next();
});

router.get('/profile', isLoggedIn, renderProfile);

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/', renderMain);

router.get('/hashtag', renderHashtag);

// 지도 관련 엔드포인트 추가
router.post('/map', (req, res) => {
  // 지도 관련 데이터 처리 로직 추가
  res.status(200).json({ message: '지도 데이터 처리 완료' });
});

module.exports = router;