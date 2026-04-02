import { transactions } from "../data/mockData";

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000); // simulate 1 sec delay
  });
};