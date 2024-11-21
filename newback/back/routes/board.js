const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { getMyBoards, createBoard, updateBoard, deleteBoard, getBoardDetail } = require('../controllers/board.js');

const router = express.Router();

router.get('/myBoard', isLoggedIn, getMyBoards);
router.post('/write', isLoggedIn, createBoard);
router.put('/modify/:boardId', isLoggedIn, updateBoard);
router.delete('/delete/:boardId', isLoggedIn, deleteBoard);
router.get('/detail/:boardId', isLoggedIn, getBoardDetail);

module.exports = router;