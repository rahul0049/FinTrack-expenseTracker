import { useEffect, useState } from "react";
import useAccountStore from "../store/accountStore";

const AddMoney = () => {
  const { accounts, fetchAccounts, addMoney, loading } =
    useAccountStore();

  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addMoney(accountId, amount);

    setAmount("");
    setAccountId("");
    alert("Money added successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Money</h3>

      <select
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        required
      >
        <option value="">Select Account</option>
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
        {loading ? "Adding..." : "Add Money"}
      </button>
    </form>
  );
};

export default AddMoney;
