const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { afterUploadImage, uploadPost, getPosts, getLocations, likePost, reservePost } = require('../controllers/post');
const { isLoggedIn, isOwner } = require('../middlewares');

const router = express.Router();

const { getMyBoards } = require('../controllers/board.js');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

router.post('/write', isLoggedIn, isOwner, upload.single('image'), uploadPost);
router.get('/', getPosts);

// POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

// POST /post
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

// GET /post/locations
router.get('/locations', getLocations);

// POST /post/:postId/like
router.post('/:postId/like', isLoggedIn, likePost);

// POST /post/:postId/reserve
router.post('/:postId/reserve', isLoggedIn, reservePost);

module.exports = router;