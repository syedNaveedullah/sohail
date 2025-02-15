import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import Home from "./components/Home";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import ForgotPassword from "./components/ForgotPassword";
import CustomNavbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transaction from "./components/Transaction";
import Profile from "./components/Profile";
import Buy from "./components/Buy";
import Confirm from "./components/Confirm";
import ReqSubmittedPage from "./components/ReqSubmittedPage";
import TransactionsDetails from "./components/TransactionsDetails";

import { ToastContainer } from "react-toastify";
import Email from "./components/Email";
import ResetPassword from "./components/ResetPassword";


function App() {

  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>  
    <Router>
      <Routes>
        <Route path="/Navbar" element={<CustomNavbar />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/Confirm" element={<Confirm />} />
        <Route path="/ReqSubmittedPage" element={<ReqSubmittedPage />} />
        <Route path="/TransactionsDetails" element={<TransactionsDetails />} />
        <Route path="/login" element={<LoginModal show={true} handleClose={() => {}} />} />
        <Route path="/signup" element={<SignUpModal show={true} handleClose={() => {}} />} />
        <Route path="/verifyEmail/:token" element={<Email show={true} handleClose={() => {}} />} />
        <Route path="/resetpassword/:token" element={<ResetPassword show={true} handleClose={() => {}} />} />

        <Route
          path="/"
          element={
            <div>
              <ToastContainer />
              <Home />
              <LoginModal />
              <SignUpModal />
              <ForgotPassword />
            </div>
          }
        />
      </Routes>
    </Router>
  // </QueryClientProvider>  
  );
}

export default App;
