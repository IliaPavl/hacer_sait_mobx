import axios from "axios";
import { BASE_URL } from "../const/Consts";
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            if (
                (err.response.status === 401 || err.response.status === 401)
                && !originalConfig._retry
            ) {
                originalConfig._retry = true;
                try {
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403) {
                console.error("Вы не авторизованы для этого ");
            }
        }
        if (err.response.status === 0) {
            console.error('Ошибка: Ошибка сети');
        }
        if (err.response.status === 503 || err.response.status === 500) {
            console.error('Ошибка: Ошибка сервера');
        }
        return Promise.reject(err);
    }
);
export default instance;