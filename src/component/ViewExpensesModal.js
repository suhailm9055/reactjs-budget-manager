import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { currencyFormatter } from "./utils";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";


export default function ViewExpensesModal({ budgetId,max, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense,editBudget } =
    useBudgets();
    
    const [budgetEdit,setBudgetEdit]=useState(false)
  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);
      
      const [nameEdit, setNameEdit] = useState('')
      
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="3" className="">
            {budgetEdit?<input className="bg-dark" value={nameEdit}  name="name" placeholder={budget?.name} onChange={e => setNameEdit(e.target.value)}></input>:<div className="me-auto">{budget?.name.toUpperCase()}-Expenses</div>}
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <form action="">{budgetEdit?<Button
                onClick={() => {
                  
                  setBudgetEdit(false)
                  editBudget({name:nameEdit,budgetId})
                  
                }}
                variant="outline-secondary"
              >
                submit
              </Button>:<Button
                onClick={() => {

                  setBudgetEdit(true)
                  
                }}
                variant="outline-secondary"
              >
                Edit
              </Button>}
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
             </form> 
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
