import { create } from "zustand";
import api from "../api/Axios.js";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,


  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/sign-in", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      throw error;
    }
  },


  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
    });
  },

  changePassword: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.put("/user/change-password", data);
      set({ loading: false });
      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Password change failed",
        loading: false,
      });
      throw error;
    }
  },

  updateUser: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.put("/user", data);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        loading: false,
      });
      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Update profile failed",
        loading: false,
      });
      throw error;
    }
  },
}));

export default useAuthStore;
