const User = require('../models/user');
const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

exports.renderProfile = (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
};

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user', 'id nick').sort({ createdAt: -1 });
    res.render('main', {
      title: 'node_project',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
}

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ title: query });
    let posts = [];
    if (hashtag) {
      posts = await Post.find({ hashtags: hashtag._id }).populate('user');
    }

    return res.render('main', {
      title: `${query} | node_project`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

exports.handleMapData = async (req, res) => {
  try {
    const { size } = req.query;
    const posts = await Post.find({ /* 위치 기반 조건 추가 */ }).limit(size);
    res.status(200).json({ data: posts, message: '지도 데이터 조회 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};