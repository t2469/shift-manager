import axios from 'axios';

// Axiosインスタンスを作成
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 環境変数からベースURLを取得
    withCredentials: true, // 必要に応じてクッキーを含むリクエストを許可
});

// リクエストインターセプター（必要に応じてトークンをヘッダーに追加）
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// レスポンスインターセプター（エラーハンドリングなど）
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // グローバルなエラーハンドリングをここに追加
        return Promise.reject(error);
    }
);

export default api;
