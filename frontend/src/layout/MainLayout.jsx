import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header'; // Adjust path if needed
import Footer from '../components/footer/Footer.jsx';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
     
    </>
  );
};

export default RootLayout;