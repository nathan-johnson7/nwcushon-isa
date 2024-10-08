import React, { useState, useEffect } from 'react';
import { auth, db } from "../firebase/Firebase"; 
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./Fund.css";

const Fund = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [newAmount, setNewAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      fetchInvestmentAmount(user.uid); 
    }
  }, []);

  //get value from db for that specific user
  const fetchInvestmentAmount = async (uid) => {
    const docRef = doc(db, "users", uid); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setAmount(data.investmentAmount || 0); 
    }
  };

  const handleAddAmount = async () => {
    const addedAmount = parseFloat(newAmount);
    setError(''); 

    //validate input
    if (isNaN(addedAmount) || addedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (newAmount.split('.')[1]?.length > 2) {
      setError("Please enter a valid amount.");
      return;
    }

    const newTotal = amount + addedAmount;
    setAmount(newTotal);
    setNewAmount('');
    await updateInvestmentAmount(auth.currentUser.uid, newTotal); 
  };
  //merge to add with less risk of data loss
  const updateInvestmentAmount = async (uid, newTotal) => {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { investmentAmount: newTotal }, { merge: true }); 
  };

  return (
    <div className="fund-container">
      <h2>Welcome, {email}</h2>
      <h3>Amount Invested Into Your Equity Fund: £{amount.toFixed(2)}</h3>
      <input
        type="number"
        value={newAmount}
        onChange={(e) => setNewAmount(e.target.value)}
        placeholder="Add amount"
        className="amount-input"
      />
      <button onClick={handleAddAmount} className="add-button">Add Amount</button>
      {error && <p className="error-message">{error}</p>} 
    </div>
  );
};

export default Fund;



