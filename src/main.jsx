import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css';

// React Router Dom
import { BrowserRouter } from 'react-router-dom';
// My Context Providers:
import { AuthContextProvider } from '@contexts/AuthContext.jsx';
import { TodosContextProvider } from './contexts/TodosContext.jsx';
import { ModalContextProvider } from '@contexts/ModalContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TodosContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </TodosContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)