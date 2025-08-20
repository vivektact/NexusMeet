import { Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import  LoginPage from "../pages/LoginPage";




const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="user/:userId" element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
        </Route>
        
    )
)


export default router