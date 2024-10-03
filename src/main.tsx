import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import App from './App.tsx';
import './index.css'
import Navbar from './components/navbar.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <App />
    </LocalizationProvider>
  </StrictMode>,
)
