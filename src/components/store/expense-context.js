import React, { useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  expenselist: (data) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, updatedExpense) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const addExpenseHandler = (expense) => {
    console.log(expense);
    setExpenses((prev) => {
      return [...prev, expense];
    });
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prevState) => {
      return prevState.filter((expense) => expense.id !== id);
    });
  };

  const updateExpenseHandler = (id, updatedExpense) => {
    setExpenses((prevState) => {
      const expenseIndex = prevState.findIndex((expense) => expense.id === id);
      const updatedExpenses = [...prevState];
      updatedExpenses[expenseIndex] = {
        ...updatedExpenses[expenseIndex],
        ...updatedExpense,
      };
      return updatedExpenses;
    });
  };

  const addExpenseFromBackend = (data) => {
    // console.log(data);
    setExpenseData(data);
    setExpenses(Object.values(data));
  };

  const values = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    expenselist: addExpenseFromBackend,
    expensedata: expenseData,
    deleteExpense: deleteExpenseHandler,
    updateExpense: updateExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={values}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
