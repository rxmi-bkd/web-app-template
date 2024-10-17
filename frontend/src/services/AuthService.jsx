import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8000/auth/";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers["X-CSRFToken"] = Cookies.get("csrftoken");
  return config;
});

export default function AuthService() {
  async function login(email, password) {
    try {
      return await instance.post("login/", {
        email,
        password,
      });
    } catch (error) {
      return error.response;
    }
  }

  async function logout() {
    try {
      return await instance.post("logout/");
    } catch (error) {
      return error.response;
    }
  }

  async function whoami() {
    try {
      return await instance.get("who_am_i/");
    } catch (error) {
      return error.response;
    }
  }

  return {
    login,
    logout,
    whoami,
  };
}
