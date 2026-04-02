import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import RoleSwitcher from "../components/RoleSwitcher";
import DashboardCards from "../components/DashboardCards";
import Charts from "../components/Charts";
import TransactionList from "../components/TransactionList";
import Insights from "../components/Insights";

const Dashboard = () => {
  const { role, darkMode, setDarkMode, loading } = useContext(AppContext);

  // 🔄 Loading Screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-black dark:text-white">
        Loading data...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Finance Dashboard
        </h1>

        <div className="flex gap-3">
          <RoleSwitcher />

          <button
  onClick={() => setDarkMode(!darkMode)}
  className="bg-gray-800 text-white px-3 py-2 rounded-full text-lg hover:scale-110 transition"
>
  {darkMode ? "☀️" : "🌙"}
</button>

          {/* Admin Only */}
          {role === "admin" && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              + Add
            </button>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DashboardCards />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Charts />
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Transactions
        </h2>
        <TransactionList />
      </div>

      {/* Insights */}
      <div className="mt-6">
        <Insights />
      </div>
    </div>
  );
};

export default Dashboard;