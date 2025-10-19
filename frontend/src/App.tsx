  
import { Route, Routes } from 'react-router-dom'
import './App.css'

import LoginPage from './components/auth pages/login'
import AdminLoginPage from './components/auth pages/SiignUp'
import Employee from './components/employee/MainDashobard'
import ProtectedRoute from './AuthGurad/AuthGurad'
import AdminGurad from './AuthGurad/AdminGurad'
import PageAccess from './AuthGurad/EmpolyeePageGurad'
import NotFoundPage from './AuthGurad/PagenotFound'
import UploadReport from './components/employee/UploadReport'
import LandingPage from './components/employee/Landingpage'
// import DashboardLayoutBranding from './components/employee/Employee'

function App() {


  return (
    <>
      <div>


        <Routes>

          {/* //AuthGurad */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LandingPage />} />

            <Route path="/admin" element={<AdminLoginPage />} />

          </Route>

{/* //PageAccess */}
          <Route element={<PageAccess />}>
            <Route path="/main" element={<Employee />} />
            <Route path='/upload' element={<UploadReport/>}/>
          </Route>



{/* ////PagenotFound */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>


      </div>
    </>
  )
}

export default App
