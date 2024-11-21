const User = require('../models/user');

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.following.push(req.params.id);
      await user.save();
      res.status(200).json({ responseMessage: '팔로우 성공' });
    } else {
      res.status(404).json({ responseMessage: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};