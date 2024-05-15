import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import { ThemeProvider } from '@gravity-ui/uikit';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme="light">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
)
