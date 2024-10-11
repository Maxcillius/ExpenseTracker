import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import App from './pages/Dashboard';
import Auth from './pages/Auth';
import './index.css'
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import Analysis from './pages/Analysis';
import Settings from './pages/Settings';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/dashboard' element={<App />}></Route>
              <Route path='/analysis' element={<Analysis />}></Route>
              <Route path='/settings' element={<Settings />}></Route>
            </Route>
            <Route path="/auth" element={<Auth/>}></Route>
          </Routes>
        </LocalizationProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
)
