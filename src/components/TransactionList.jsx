import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const TransactionList = () => {
  const { transactions, setTransactions, role } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // 🔍 Filter + Search
  const filteredData = transactions
    .filter((t) => {
      const matchesSearch = t.category
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" || t.type === typeFilter;

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      return new Date(b.date) - new Date(a.date);
    });

    const exportToCSV = () => {
  const headers = ["Date", "Category", "Type", "Amount"];

  const rows = transactions.map((t) => [
    t.date,
    t.category,
    t.type,
    t.amount,
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows]
      .map((e) => e.join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "transactions.csv");

  document.body.appendChild(link);
  link.click();
};

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <button
  onClick={exportToCSV}
  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
>
  Export CSV
</button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-black dark:text-white">
          <thead>
            <tr className="border-b">
  <th className="p-2">Date</th>
  <th className="p-2">Category</th>
  <th className="p-2">Type</th>
  <th className="p-2">Amount</th>

  {role === "admin" && (
    <th className="p-2">Actions</th>
  )}
</tr>
          </thead>

          <tbody>
            {filteredData.map((t) => (
              <tr
  key={t.id}
  className="border-b text-black dark:text-white">

  <td className="p-2">{t.date}</td>
  <td className="p-2">{t.category}</td>
  <td className="p-2 capitalize">{t.type}</td>

  <td
    className={`p-2 font-semibold ${
      t.type === "income"
        ? "text-green-600"
        : "text-red-500"
    }`}
  >
    ₹ {t.amount}
  </td>

  {/* 👇 Admin Controls */}
  {role === "admin" && (
    <td className="p-2">
      <button
        onClick={() =>
          setTransactions(
            transactions.filter((item) => item.id !== t.id)
          )
        }
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </td>
  )}
</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;