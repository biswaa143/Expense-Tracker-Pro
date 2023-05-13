import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ExpenseForm from "../ExpenseForm";
import ExpenseContext from "../store/expense-context";
import { Button } from "react-bootstrap";
import classes from "./MyExpenses.module.css";
import { useNavigate } from "react-router-dom";

const MyExpenses = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const expenseData = props.expenseData;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://expense-tracker-pro-cc7d5-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.status === 200) {
          expenseCtx.expenselist(res.data);
          console.log(expenseCtx.expenses.length);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  }, []);

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };

  const deleteExpenseHandler = (id) => {
    console.log("Delete expense with id:", id);
    axios
      .delete(
        `https://expense-tracker-pro-cc7d5-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((res) => {
        console.log("Expense successfully deleted");
        expenseCtx.deleteExpense(id);
      })
      .catch((err) => {
        console.log(err.res);
        setError(err.message);
      });
  };

  let content = null;

  if (loading) {
    content = <p>Loading expenses...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    const expenseList = expenseCtx.expenses.map((expense) => {
      console.log(expense);
      const handleEditClick = () => {
        setIsEditing(true);
        setEditedExpense(expense);
      };

      const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedExpense((prevState) => ({ ...prevState, [name]: value }));
      };

      const handleEditSubmit = (id) => {
        console.log("Edit expense with id:", id);
        axios
          .put(
            `https://expense-tracker-pro-cc7d5-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
            editedExpense
          )
          .then((res) => {
            console.log("Expense successfully updated");
            setIsEditing(false);
            expenseCtx.updateExpense(expense.id, editedExpense);
          })
          .catch((err) => {
            console.log(err.res);
            setError(err.message);
          });
      };

      const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedExpense({});
      };

      const expenseContent = isEditing ? (
        <li className={classes.expenseitem} key={expense.id}>
          <input
            type="text"
            name="amount"
            value={editedExpense.amount}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="description"
            value={editedExpense.description}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="category"
            value={editedExpense.category}
            onChange={handleEditChange}
          />
          <div>
            <Button
              style={{ backgroundColor: "green" }}
              onClick={handleEditSubmit}
            >
              Submit
            </Button>
            <Button
              style={{ backgroundColor: "red" }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </li>
      ) : (
        <li className={classes.expenseitem} key={expense.id}>
          <div>${expense.amount}</div>
          <div>{expense.description}</div>
          <div>{expense.category}</div>
          <div>
            <Button
              style={{ backgroundColor: "red" }}
              onClick={() => deleteExpenseHandler(expense.id)}
            >
              Delete
            </Button>
            <Button
              style={{ backgroundColor: "orange" }}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </div>
        </li>
      );
      return expenseContent;
    });

    content = (
      <>
        <div className={classes.expenseheading}>
          <h2>Amount</h2>
          <h2 className={classes.description}>Description</h2>
          <h2>Category</h2>
          <h2>Action</h2>
        </div>
        {expenseList.length > 0 ? (
          <ul className={classes.expenselist}>{expenseList}</ul>
        ) : (
          <p>No expenses found.</p>
        )}
      </>
    );
  }

  return (
    <div className={classes.expensebox}>
      <h1>Expenses</h1>
      <ExpenseForm />
      {content}
      <h3>
        Go to
        <span onClick={goToLoginPage}> Login page</span>
      </h3>
    </div>
  );
};

export default MyExpenses;
