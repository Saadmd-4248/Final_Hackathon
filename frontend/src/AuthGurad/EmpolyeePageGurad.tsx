import { Outlet } from "react-router-dom"
import LoginPage from "../components/auth pages/login"




const PageAccess = ()=>{
    const isAuth = !!localStorage.getItem('token')
    return(
        isAuth ? <Outlet/> : <LoginPage/>
    )
}
export default PageAccess