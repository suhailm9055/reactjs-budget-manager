import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./component/BudgetCard";
import AddBudgetModal from "./component/AddBudgetModal";
import { useBudgets } from "./context/BudgetContext";
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <>
      <Container  className=" my-4 col-md-10 col-lg-8"  >
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        ></div>
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total,expense)=>total+expense.amount,0
          )
          return(
          <BudgetCard
            key={budget.id}
            name={budget.name}
            amount={amount}
            max={budget.max}
          ></BudgetCard>
        )})}
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
    </>
  );
}

export default App;
