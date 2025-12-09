import axios from 'axios';

// 백엔드 API의 기본 URL 설정
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',   // 백엔드 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;