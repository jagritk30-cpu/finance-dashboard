import { createContext, useState, useEffect } from "react";
import { fetchTransactions } from "../api/mockApi";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  // 🔄 Load data (API + localStorage)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const saved = localStorage.getItem("transactions");

      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        const data = await fetchTransactions();
        setTransactions(data);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        darkMode,
        setDarkMode,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};