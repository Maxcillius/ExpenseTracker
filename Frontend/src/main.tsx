import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import Main from './pages/main'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>  
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/dashboard' element={<Main name={'Dashboard'}/>}></Route>
              {/* <Route path='/analysis' element={<Main name={'Analysis'}/>}></Route> */}
              <Route path='/settings' element={<Main name={'Settings'}/>}></Route>
            </Route>
            <Route path="/auth/signin" element={<Signin/>}></Route>
            <Route path="/auth/signup" element={<Signup/>}></Route>
          </Routes>
        </LocalizationProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
)
