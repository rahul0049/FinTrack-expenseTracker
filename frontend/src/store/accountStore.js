import { create } from "zustand";
import api from "../api/Axios.js";

const useAccountStore = create((set, get) => ({
  accounts: [],
  loading: false,
  error: null,

  fetchAccounts: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/account");

      set({
        accounts: res.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load accounts",
        loading: false,
      });
    }
  },
  createAccount: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.post("/account/create", data);
      await get().fetchAccounts();
      set({ loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to create account",
        loading: false,
      });
      throw error;
    }
  },
  addMoney: async (accountId, amount) => {
    try {
      set({ loading: true, error: null });

      await api.put(`/account/add-money/${accountId}`, {
        amount,
      });

      await get().fetchAccounts();
      set({ loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to add money",
        loading: false,
      });
      throw error;
    }
  },
  deleteAccount: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/account/${id}`);
      await get().fetchAccounts();
      set({ loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete account",
        loading: false,
      });
      throw error;
    }
  },
  transferMoney: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.put("/transaction/transfer-money", data);
      await get().fetchAccounts();
      set({ loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to transfer money",
        loading: false,
      });
      throw error;
    }
  },
}));

export default useAccountStore;
