exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ responseMessage: '로그인이 필요합니다.' });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ responseMessage: '이미 로그인한 상태입니다.' });
  }
};

// 사장님 유저만 게시물 작성하게 하는 미들웨어
exports.isOwner = (req, res, next) => {
  if (req.isAuthenticated() && req.user.userType === 'owner') {
    return next();
  } else {
    return res.status(403).json({ responseMessage: '게시물 작성은 오너 유저만 가능합니다.' });
  }
};