import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import UserServices from "../services/userServices";
import { updateTokens } from "../redux/features/User/userSlice";

// Set REACT_APP_API_BASE_URL in Netlify's build environment.
// Keep the localhost fallback for local development.
const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

export const backend = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxiosInstance = (userInfo, dispatch) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.access}`,
    },
  });

  instance.interceptors.request.use(async (req) => {
    if (!userInfo?.access || !userInfo?.refresh) {
      return Promise.reject(new Error("Please sign in again."));
    }

    const accessToken = jwtDecode(userInfo.access);
    const accessIsExpired =
      dayjs.unix(accessToken.exp).diff(dayjs()) < 60000;

    if (!accessIsExpired) return req;

    const refreshToken = jwtDecode(userInfo.refresh);
    const refreshIsExpired =
      dayjs.unix(refreshToken.exp).diff(dayjs()) < 60000;

    if (!refreshIsExpired) {
      const response = await UserServices.tokenRefresh({
        refresh: userInfo.refresh,
      });
      dispatch(updateTokens(response.data));
      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    }

    return Promise.reject(new Error("Please sign in again."));
  });

  return instance;
};
