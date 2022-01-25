import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, NavLink, Stack } from "react-bootstrap";
import BudgetCard from "./component/BudgetCard";
import AddBudgetModal from "./component/AddBudgetModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import AddExpenseModal from "./component/AddExpenseModal";
import UnCategorizedBudgetCard from "./component/UnCategorizedBudgetCard";
import TotalBudgetCard from "./component/TotalBudgetCard";
import ViewExpensesModal from "./component/ViewExpensesModal";
import "./App.css"
import { v4 as uuidV4 } from "uuid";
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false);
  const [sampleBudgetid,setSampleBudgetid]= useState(true)
  const { budgets, getBudgetExpenses,sampleBudget } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  
 const id=uuidV4();
 const name=['food',"travel","dress","entertainment"]
 const amount=[200,300,400,500,600,700,800,900]
 const x=Math.floor(Math.random() * name.length)
 console.log(x+"x");
function sampleValues(e){
  
    e.preventDefault();
    sampleBudget({
      id: id,
      description: "exp",
      amount: amount[Math.floor(Math.random() * amount.length)],
      budgetId: id,
      name: name[x],
      max: amount[Math.floor(Math.random() * amount.length)]+1000
   
})
setSampleBudgetid(false)
}
  return (
    <>
      <Container className=" my-4 App">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto heading1">Budget-App</h1>
          <Button variant="outline-primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard onClick={() =>
              setViewExpensesModalBudgetId(budget.id)}
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              openAddExpenseClick={() => openAddExpenseModal(budget.id)}
              openViewExpensesClick={() =>
                setViewExpensesModalBudgetId(budget.id)
              }
            ></BudgetCard>
          );
        })}
         </div>

        <UnCategorizedBudgetCard
          openAddExpenseClick={openAddExpenseModal}
          openViewExpensesClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />

        <TotalBudgetCard />
        
          <div>
        <NavLink onClick={sampleValues}>Show Sample Budgets</NavLink>
      </div>
        
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => {
          setViewExpensesModalBudgetId();
        }}
      />
      
     
    </>
  );
}

export default App;
