import { instance } from './axios';

// 지도 범위 내 데이터 요청
export const postMapRange = (size) => {
    return instance.post(`/api/map?size=${size}`)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.error(error);
        return error;
    })
}