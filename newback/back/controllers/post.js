const Post = require('../models/post');
const User = require('../models/user');

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/uploads/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
  console.log("게시물작성 입력 데이터: ", req.body);
  const { title, content, category, original_price, discount_rate, sale_end_date, latitude, longitude } = req.body;

  if (!category || !['bread', 'rice_cake', 'side_dish', 'grocery', 'etc'].includes(category)) {
    return res.status(400).json({ responseMessage: '카테고리를 선택해주세요.' });
  }

  try {
    const post = await Post.create({
      title,
      content,
      original_price,
      discount_rate,
      sale_end_date,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      latitude,
      longitude,
      user: req.user.id,
    });

    return res.status(201).json({
      id: post._id,
      responseMessage: '게시물이 성공적으로 작성되었습니다.',
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 0;
    const size = parseInt(req.query.size, 10) || 10;
    const sort = req.query.sort ? req.query.sort.split(',') : ['createdAt', 'DESC'];

    const posts = await Post.find()
      .skip(page * size)
      .limit(size)
      .sort({ [sort[0]]: sort[1] === 'DESC' ? -1 : 1 })
      .populate('user', 'id nick');

    const responseDtos = posts.map(post => ({
      id: post._id,
      title: post.title,
      content: post.content,
      image: post.image,
      category: post.category,
      original_price: post.original_price,
      discount_rate: post.discount_rate,
      price: post.original_price * (1 - post.discount_rate / 100),
      sale_end_date: post.sale_end_date,
      status: post.sale_end_date && new Date(post.sale_end_date) < new Date() ? '거래완료' : '판매중',
      nickname: post.user.nick,
      latitude: post.latitude,
      longitude: post.longitude,
    }));

    return res.status(200).json({
      data: {
        responseDtos,
        page,
        size,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Post.find({}, 'title latitude longitude');
    return res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

// 게시물 좋아요
exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ responseMessage: '게시물을 찾을 수 없습니다.' });
    }
    // 좋아요 로직 추가 (예: post.likes.push(req.user.id))
    res.status(200).json({ responseMessage: '좋아요 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

// 게시물 예약
exports.reservePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ responseMessage: '게시물을 찾을 수 없습니다.' });
    }
    // 예약 로직 추가 (예: post.reservations.push(req.user.id))
    res.status(200).json({ responseMessage: '예약 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};