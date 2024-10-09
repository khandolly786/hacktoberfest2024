import axios from "axios";

const serverUrl = import.meta.env.VITE_API_URL + '/api'  // This should point to your backend API in production

export default class Global {
    static user;

    static axios = axios.create({
        baseURL: serverUrl,
        withCredentials: true,  // Ensure cookies/credentials are sent
    });

    static async getUser() {
        try {
            const res = await this.httpGet("/auth/me");
            return res.user;
        } catch (err) {
            throw new Error("User not found");
        }
    }

    static async httpGet(endPoint, params = {}) {
        try {
            const token = localStorage.getItem('token');  // Get token from localStorage
            const res = await this.axios.get(endPoint, {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`  // Add token to headers
                },
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            throw new Error("Error fetching data");
        }
    }

    static async httpPost(endPoint, body) {
        try {
            const token = localStorage.getItem('token');  // Get token from localStorage
            const res = await this.axios.post(endPoint, body, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Add token to headers
                },
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            throw new Error("Error sending data");
        }
    }
}
