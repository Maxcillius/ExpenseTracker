import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import App from './App.tsx';
import './index.css'
import Navbar from './components/navbar.tsx';
import { RecoilRoot } from 'recoil';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <App />
      </LocalizationProvider>
    </RecoilRoot>
  </StrictMode>,
)
