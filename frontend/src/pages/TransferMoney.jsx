import React from 'react'
import { useState } from 'react'
import useTransactionStore from '../store/transactionStore.js'
const TransferMoney = () => {
    const {transferMoney,loading} = useTransactionStore();
    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await transferMoney ({from_account:fromAccount,to_account:toAccount,amount});
        setFromAccount("");
        setToAccount("");
        setAmount("");
        alert("Transfer successful")
    }   
  return (
    <form onSubmit={handleSubmit}>
        <h3>Transfer Money </h3>
        <select 
            value={fromAccount}
            onChange={(e)=> setFromAccount(e.target.value)}
            required 
            >
                <option value="" >From Account</option>
                {accounts.map((acc)=>(
                    <option  key={acc.id} value={acc.id}>{acc.account_name}</option>
                ))}
            </select>
            <select
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        required
      >
        <option value="">To Account</option>
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.account_name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Transferring..." : "Transfer"}
      </button>
    </form>
  )
}

export default TransferMoney
