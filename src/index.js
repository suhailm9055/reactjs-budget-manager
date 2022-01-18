import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BudgetsProvider} from './context/BudgetContext'
ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
    <App />
    </BudgetsProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
