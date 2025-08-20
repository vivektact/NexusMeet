import Footer from "../components/footer/Footer";
import Header from "../components/header/Header"; 
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    <Toaster position="top-center" />
    </>
  )
}

export default MainLayout



