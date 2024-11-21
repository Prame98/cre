import { instance } from './axios';

// 게시물 좋아요
export const likePost = (postId) => {
  return instance.post(`/api/post/${postId}/like`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('좋아요 실패:', error.response.data);
      throw error;
    });
};
