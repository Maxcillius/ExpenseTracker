import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import Main from './pages/main'

const RootRedirect = () => {
  const location = useLocation();
  
  if (location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/auth/signin" element={<Signin />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Main name={'Dashboard'} />} />
              {/* <Route path="/analysis" element={<Main name={'Analysis'} />} /> */}
              <Route path="/settings" element={<Main name={'Settings'} />} />
            </Route>
            <Route path="/" element={<RootRedirect />} />
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </LocalizationProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>
)