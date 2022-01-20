import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BudgetsProvider} from './context/BudgetContext'
import 'semantic-ui-css/semantic.min.css'
ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
    <App className="App" />
    </BudgetsProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
