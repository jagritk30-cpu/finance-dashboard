import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RoleSwitcher = () => {
  const { role, setRole } = useContext(AppContext);

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white transition"
    >
      <option value="viewer" className="text-black">
        Viewer
      </option>
      <option value="admin" className="text-black">
        Admin
      </option>
    </select>
  );
};

export default RoleSwitcher;