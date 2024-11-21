const Post = require('../models/post');

// 게시글 작성
exports.createBoard = async (req, res, next) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json({ data: newPost, message: '게시글 작성 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

// 게시글 수정
exports.updateBoard = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.boardId, req.body, { new: true });
    res.status(200).json({ data: updatedPost, message: '게시글 수정 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

// 게시글 삭제
exports.deleteBoard = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.boardId);
    res.status(200).json({ message: '게시글 삭제 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

// 게시글 상세 조회
exports.getBoardDetail = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.boardId);
    res.status(200).json({ data: post, message: '게시글 조회 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};

// 사장님유저 마이페이지에 자기 게시물 보이게 하기
exports.getMyBoards = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      data: posts,
      message: "Successfully retrieved user's posts.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ responseMessage: '서버 에러가 발생했습니다.' });
  }
};