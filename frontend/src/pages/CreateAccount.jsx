import { useState } from "react";
import useAccountStore from "../store/accountStore";

const CreateAccount = () => {
  const { createAccount, loading } = useAccountStore();

  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createAccount({
      name,
      account_number: accountNumber,
      amount,
    });

    setName("");
    setAccountNumber("");
    setAmount("");
    alert("Account created successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Account</h3>

      <input
        type="text"
        placeholder="Account Name (Cash / Bank)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Account Number (optional)"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />

      <input
        type="number"
        placeholder="Initial Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
};

export default CreateAccount;
