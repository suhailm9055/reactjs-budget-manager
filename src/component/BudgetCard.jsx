import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "./utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  openAddExpenseClick,
  hideButtons,
}) {
  const className = ["my-4 "];
  if (amount > max) {
    className.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    className.push("bg-light");
  }
  return (
    <Card className={className.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVarient(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
         {!hideButtons &&  <Stack direction="horizontal" gap="2" className="mt-4">
         <Button
            variant="outline-primary"
            className="ms-auto"
            onClick={openAddExpenseClick}
          >
            Add Expense
          </Button>
         <Button variant="outline-secondary">View Expenses</Button>
        </Stack>
         }
      </Card.Body>
    </Card>
  );
}

function getProgressBarVarient(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.8) return "warning";
  return "danger";
}
