// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom'
import Home from "../pages/HomePage.jsx"
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'



import RootLayout from "../layout/MainLayout.jsx"

const router = createBrowserRouter([
    {
       path: '/',
       element: <RootLayout />,
       children: [
        {
            path: "",
            element: <Home/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/register",
            element: <RegisterPage/>
        }
       ]

    }
])

export default router
