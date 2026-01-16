import { create } from "zustand";
import api from "../api/Axios.js";
const useTransactionStore = create((set, get) => ({
    transactions: [],
    loading: false,
    error: null,
    fetchTransactions: async (filters = {}) => {
        try {
            set({ loading: true, error: null });
            const res = await api.get("/transaction", {
                params: {
                    df: filters.fromDate,
                    dt: filters.toDate,
                    s: filters.search,
                },
            });

            set({
                transactions: res.data.data,
                loading: false,
            })
        } catch (error) {
            set({
                error: error.response?.data?.message || "failed to fetch transactions",
                loading: false,
            })
        }
    },
    addTransaction: async (accountId, data) => {
        try {
            set({ loading: true, error: null });
            await api.post(`/transaction/add-transaction/${accountId}`, data);
            await get().fetchTransactions();
            set({ loading: false })
        } catch (error) {
            set({
                error: error.response?.data?.message || "failed to add transaction",
                loading: false,
            });
            throw error;
        }
    },
    transferMoney: async (data) => {
        try {
            set({ loading: true, error: null });
            await api.put("/transaction/transfer-money", data);
            await get().fetchTransactions();
            set({ loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Transfer failed",
                loading: false,
            });
            throw error;
        }
    },
}
))
export default useTransactionStore