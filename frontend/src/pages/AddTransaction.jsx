import { useState } from "react";
import useTransactionStore from "../store/transactionStore.js";
import useAccountStore from "../store/accountStore.js";
const AddTransaction = ({accountId}) =>{
    const {addTransaction,loading} = useTransactionStore();

    const [description, setDescription] = useState("");
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await addTransaction(accountId,{
            description,source,amount
        });
        setDescription("");
        setSource("");
        setAmount("");
        alert("Transaction added successfullly")
    };
    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Expense</h3>
            <input
                type="text"
                placeholder="Source"
                value={source} 
                onChange={(e)=> setSource(e.target.value)}
                required/>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e)=> setAmount(e.target.value)}
                required/>
            <button type="submit" disabled ={loading}>
                {loading? "Processing ..." :"Add Transaction" }
            </button>
        </form>
    )
}
export default AddTransaction;