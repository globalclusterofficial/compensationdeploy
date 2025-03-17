import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  refreshTokenAction,
  selectAccessToken,
  selectRefreshToken,
} from "../../features/auth/authSlice";

export const useTokens = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = useSelector(selectRefreshToken);
  const access = useSelector(selectAccessToken);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("/api/v1/accounts/token/refresh/", {
        token_refresh: refresh,
      });
      const newAccessToken = response.data.access;
      dispatch(refreshTokenAction({ access: newAccessToken }));
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      navigate("/login");
      throw error;
    }
  };

  return { access, refreshAccessToken };
};
