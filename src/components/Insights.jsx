import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Insights = () => {
  const { transactions } = useContext(AppContext);

  // Total transactions
  const totalTransactions = transactions.length;

  // Total expenses
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // Highest spending category
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const highestCategory =
    Object.keys(categoryMap).length > 0
      ? Object.keys(categoryMap).reduce((a, b) =>
          categoryMap[a] > categoryMap[b] ? a : b
        )
      : "-";

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
        Insights
      </h2>

      <div className="space-y-2 text-black dark:text-white">
        <p>📊 Total Transactions: {totalTransactions}</p>
        <p>💸 Total Expenses: ₹ {totalExpense}</p>
        <p>🏆 Top Category: {highestCategory}</p>
      </div>
    </div>
  );
};

export default Insights;