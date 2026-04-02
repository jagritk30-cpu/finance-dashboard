import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const DashboardCards = () => {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const Card = ({ title, value, color }) => (
    <div
      className={`p-6 rounded-2xl shadow-lg text-white ${color} transition transform hover:scale-105`}
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-2xl font-bold mt-2">₹ {value}</p>
    </div>
  );

  return (
    <>
      <Card title="Total Balance" value={balance} color="bg-blue-500" />
      <Card title="Income" value={income} color="bg-green-500" />
      <Card title="Expenses" value={expense} color="bg-red-500" />
    </>
  );
};

export default DashboardCards;