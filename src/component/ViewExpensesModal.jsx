 
import { Button,Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
export default function ViewExpensesModal({budgetId,handleClose}) {
   
    const {getBudgetExpenses,budgets,deleteBudget,deleteExpenses }=useBudgets()
   
    const budget= UNCATEGORIZED_BUDGET_ID=== budgetId?{name:"Uncategorized",id:UNCATEGORIZED_BUDGET_ID}: budgets.find(b=>b.id===budgetId)

    return (
        <Modal show={budgetId!= null} onHide={handleClose}>
           
                <Modal.Header closeButton>

                 <Modal.Title>

                    <Stack direction="horizontal" gap='2'>
                        <div>{budget?.name}-Expenses</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID &&(
                            <Button onClick={()=>{
                                deleteBudget(budget)
                                handleClose()
                            }} variant="outline-danger"> Delete</Button>
                        )

                        }
                    </Stack>
                 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    

               

                </Modal.Body>
            
        </Modal>
    )
}
