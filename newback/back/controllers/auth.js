const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// 회원가입
exports.join = async (req, res, next) => {
  console.log("회원가입 요청 데이터: ", req.body);
  const { userId, nickname, password, userType, address, time } = req.body;
  console.log("Address 객체:", address);
  try {
    const exUser = await User.findOne({ userId });
    if (exUser) {
      console.log("이미 존재하는 사용자입니다.");
      return res.status(400).json({ responseMessage: '이미 존재하는 사용자입니다.' });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      userId,
      nick: nickname,
      password: hash,
      userType,
      address: JSON.stringify(address),
      time: userType === 'owner' ? time : null
    });
    console.log("회원가입 성공");
    return res.status(201).json({ responseMessage: '회원가입 성공' });
  } catch (error) {
    console.error("회원가입 에러:", error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
}

// 로그인
exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error("인증 에러:", authError);
      return res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
    }
    if (!user) {
      console.log("사용자 없음:", info.message);
      return res.status(400).json({ responseMessage: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error("로그인 에러:", loginError);
        return res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
      }

      const token = jwt.sign(
        { id: user.id, userId: user.userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log("JWT 토큰:", token);

      let parsedAddress = {};
      try {
        if (user.address) {
          parsedAddress = JSON.parse(user.address);
        }
      } catch (e) {
        console.log("address를 json파싱 하는데에 실패:", e);
      }

      console.log("로그인 성공:", user.userId);
      return res.status(200).json({
        userId: user.userId,
        nickname: user.nick,
        address: parsedAddress,
        userType: user.userType,
        token,
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("로그아웃 성공");
    res.status(200).json({ responseMessage: '로그아웃 성공' });
  });
};
