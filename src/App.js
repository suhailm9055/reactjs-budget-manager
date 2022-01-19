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
  
 
function sampleValues(e){
  
    e.preventDefault();
    sampleBudget({
      id: "123",
      description: "food",
      amount: 300,
      budgetId: "123",
      name: "foods",
      max: 1300
   
})
setSampleBudgetid(false)
}
  return (
    <>
      <Container className=" my-4 ">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        ></div>
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard
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

        <UnCategorizedBudgetCard
          openAddExpenseClick={openAddExpenseModal}
          openViewExpensesClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />

        <TotalBudgetCard />
        {sampleBudgetid &&
          <div>
        <NavLink onClick={sampleValues}>Show Sample Budgets</NavLink>
      </div>
        }
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
