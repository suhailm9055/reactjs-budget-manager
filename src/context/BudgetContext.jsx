import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name,max}];
    });
  }
  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expenses) => expenses.id !== id);
    });
  }
  function sampleBudget({ id, description, amount, budgetId,name,max }) {
    setBudgets((prevBudgets) => {
      setExpenses((prevExpenses) => {
        return [...prevExpenses,{id ,description,amount,budgetId}]
      })
      return [...prevBudgets, { id, name:name, max:max }];
    });
  }
  
  // function findBudget({id}){
  //  var budget = setBudgets((prevBudgets) => {(setBudgets((prevBudgets) =>.find((budget) => budget.id === id)) 
    
    
  // })}
  function editdelBudget({id}){
  setBudgets((prevBudgets) => {
    return prevBudgets.filter((budgeta) => budgeta.id !== id);
    
  })
  

}
  function editBudget({name,budgetId}){
    var budget={}
    var foundIndex = budgets.findIndex(x => x.id == budgetId);
    budget=budgets[foundIndex]
    budget.name=name
     editdelBudget({ budgetId })
      }


      // function editdelExpenses({id,expense}){
      //   setExpenses((prevExpenses) => {
      //     return prevExpenses.filter((expensa) => expensa.id !== id)
      //   })
      // }
      // function editExpense({amount,id}){
      //   console.log(amount+"amount");
      //   console.log(id+"id");
      //   var expense={}
      //   var foundIndex = expenses.findIndex(x => x.id == id);
      //   expense=expenses[foundIndex]
      //   expense.amount=amount
      //    editdelExpenses({ id,expense })
         
      // }
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        sampleBudget,
        editBudget,
        // editExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
