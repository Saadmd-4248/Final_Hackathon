import { Outlet } from "react-router-dom"
// import LoginPage from "../components/auth pages/login"
import Employee from '../components/employee/MainDashobard'
import LandingPage from '../components/employee/Landingpage'




const PageAccess = ()=>{
    const isAuth = !!localStorage.getItem('token')
    return(
        isAuth ? <Employee/> : <LandingPage/>
    )
}
export default PageAccess