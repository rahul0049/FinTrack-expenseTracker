import {create} from 'zustand'
import api from '../api/Axios.js'
const useDashboardStore = create((set)=>({
    loading:false,
    error:null,
    availableBalance:0,
    totalExpense:0,
    totalIncome:0,
    chartData:[],
    lastTransactions:[],
    lastAccounts:[],

    fetchDashBoard: async ()=>{
        try {
            set({loading:true,error:null});
            const res=await api.get("/transaction/dashboard");
            set({
                availableBalance:res.data.availableBalance,
                totalExpense:res.data.totalExpense,
                totalIncome:res.data.totalIncome,
                chartData:res.data.chartData,
                lastTransactions:res.data.lastTransactions,
                lastAccounts:res.data.lastAccounts,
            })
        } catch (error) {
            set({error:error.response?.data?.message || "failed to load dashboard",loading:false})
        }
    }
}))
export default useDashboardStore;