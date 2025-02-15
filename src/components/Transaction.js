import React, { useState } from "react";
import { Container, Table, Nav, Form, Button, InputGroup } from "react-bootstrap";
import { FaSyncAlt, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CustomNavbar from "./Navbar";
import "./pay.css";

const Transaction = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const navigate = useNavigate(); // Initialize navigation

  // Buy Transactions Data
  const buyTransactions = [
    {
      date: "06-02-2025",
      userName: "Charan",
      email: "saicharansampathirao@gmail.com",
      tether: "100.00",
      inr: "9524.73",
      walletAddress: "asdfjkl",
      mode: "UPI",
      status: "PAYMENT DONE",
    },
  ];

  // Sell Transactions Data
  const sellTransactions = [
    {
      date: "07-02-2025",
      userName: "Syed Naveed",
      email: "naveed@gmail.com",
      tether: "50.00",
      inr: "4762.36",
      walletAddress: "zxcvbnm",
      mode: "Bank Transfer",
      status: "PROCESSING",
    },
  ];

  return (
    <>
      <CustomNavbar />
      <div className="transactions-history">
        {/* Header Section */}
        <div className="transactions-header">
          <h3>Transactions History</h3>
        </div>

        <Container style={{ transform: "translateY(-27%)" }}>
          {/* Buy/Sell Tabs */}
          <Nav variant="tabs" defaultActiveKey="buy" className="transactions-tabs">
            <Nav.Item>
              <Nav.Link eventKey="buy" active={activeTab === "buy"} onClick={() => setActiveTab("buy")}>
                Buy
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sell" active={activeTab === "sell"} onClick={() => setActiveTab("sell")}>
                Sell
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Search Filters */}
          <div className="search-filters">
            <InputGroup className="search-input">
              <Form.Control placeholder="Search By Ref No" />
            </InputGroup>

            <InputGroup className="search-input">
              <InputGroup.Text>From</InputGroup.Text>
              <Form.Control type="date" />
            </InputGroup>

            <InputGroup className="search-input">
              <InputGroup.Text>To</InputGroup.Text>
              <Form.Control type="date" />
            </InputGroup>

            <Button className="search-btn">Search</Button>

            <Button className="refresh-btn">
              <FaSyncAlt />
            </Button>
          </div>

          {/* Transactions Table */}
          <Table responsive bordered className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Tether</th>
                <th>INR</th>
                <th>Wallet Address</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "buy" ? buyTransactions : sellTransactions).map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.userName}</td>
                  <td>{transaction.email}</td>
                  <td>{transaction.tether}</td>
                  <td>{transaction.inr}</td>
                  <td>{transaction.walletAddress}</td>
                  <td>
                    <span className="mode-tag">{transaction.mode} </span>
                  </td>
                  <td>
                    <Button
                      className={`status-btn1 ${transaction.status.toLowerCase().replace(" ", "-")}`}
                      onClick={() => navigate("/TransactionsDetails")}
                      style={{background:'transparent', border:'none', color:'#d4af37'}}
                    >
                      {transaction.status} <FaChevronRight />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      <br/> <br/> <br/> <br/> <br/> <br/> <br/>

      {/* Footer */}
      <footer className="text-center py-3" style={{ background: "#333", color: "#fff" }}>
        <Container>
          <p className="mb-0">© 2025 Richesse Currency Exchange, All Rights Reserved</p>
          <p className="mb-0">
            <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>Terms of Use</a> |
            <a href="#privacy" style={{ color: "#fff", textDecoration: "none" }}> Privacy Policy</a>
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Transaction;





// import React from "react";
// import { Container, Card, Table, Form, Button, InputGroup } from "react-bootstrap";
// import { FaSyncAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import CustomNavbar from "./Navbar";
// import "./pay.css";

// const Transaction = () => {
//   const navigate = useNavigate();

//   // Buy Transactions Data
//   const buyTransactions = [
//     {
//       date: "06-02-2025",
//       userName: "Charan",
//       email: "saicharansampathirao@gmail.com",
//       tether: "100.00",
//       inr: "9524.73",
//       walletAddress: "asdfjkl",
//       mode: "UPI",
//       status: "PAYMENT DONE",
//     },
//   ];

//   // Sell Transactions Data
//   const sellTransactions = [
//     {
//       date: "07-02-2025",
//       userName: "Ramesh",
//       email: "ramesh@gmail.com",
//       tether: "50.00",
//       inr: "4762.36",
//       walletAddress: "zxcvbnm",
//       mode: "Bank Transfer",
//       status: "PROCESSING",
//     },
//   ];

//   return (
//     <>
//       <CustomNavbar />
//       <div className="transactions-history">
//         {/* Header Section */}
//         <div className="transactions-header text-center">
//           <h3>Transactions History</h3>
//         </div>

//         <Container>
//           <div className="d-flex justify-content-between flex-wrap">
//             {/* Buy Transactions Card */}
//             <Card className="transaction-card">
//               <Card.Header className="text-center">Buy Transactions</Card.Header>
//               <Card.Body>
//                 {/* Search Filters */}
//                 <div className="search-filters">
//                   <InputGroup className="search-input">
//                     <Form.Control placeholder="Search By Ref No" />
//                   </InputGroup>
//                   <InputGroup className="search-input">
//                     <InputGroup.Text>From</InputGroup.Text>
//                     <Form.Control type="date" />
//                   </InputGroup>
//                   <InputGroup className="search-input">
//                     <InputGroup.Text>To</InputGroup.Text>
//                     <Form.Control type="date" />
//                   </InputGroup>
//                   <Button className="search-btn">Search</Button>
//                   <Button className="refresh-btn">
//                     <FaSyncAlt />
//                   </Button>
//                 </div>
//                 {/* Buy Transactions Table */}
//                 <Table responsive bordered className="transactions-table">
//                   <thead>
//                     <tr>
//                       <th>Date</th>
//                       <th>User Name</th>
//                       <th>Email</th>
//                       <th>Tether</th>
//                       <th>INR</th>
//                       <th>Wallet Address</th>
//                       <th>Mode</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {buyTransactions.map((transaction, index) => (
//                       <tr key={index}>
//                         <td>{transaction.date}</td>
//                         <td>{transaction.userName}</td>
//                         <td>{transaction.email}</td>
//                         <td>{transaction.tether}</td>
//                         <td>{transaction.inr}</td>
//                         <td>{transaction.walletAddress}</td>
//                         <td>
//                           <span className="mode-tag">{transaction.mode}</span>
//                         </td>
//                         <td>
//                           <Button
//                             className={`status-btn1 ${transaction.status.toLowerCase().replace(" ", "-")}`}
//                             onClick={() => navigate("/TransactionsDetails")}
//                           >
//                             {transaction.status}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>

//             {/* Sell Transactions Card */}
//             <Card className="transaction-card">
//               <Card.Header className="text-center">Sell Transactions</Card.Header>
//               <Card.Body>
//                 {/* Sell Transactions Table */}
//                 <Table responsive bordered className="transactions-table">
//                   <thead>
//                     <tr>
//                       <th>Date</th>
//                       <th>User Name</th>
//                       <th>Email</th>
//                       <th>Tether</th>
//                       <th>INR</th>
//                       <th>Wallet Address</th>
//                       <th>Mode</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sellTransactions.map((transaction, index) => (
//                       <tr key={index}>
//                         <td>{transaction.date}</td>
//                         <td>{transaction.userName}</td>
//                         <td>{transaction.email}</td>
//                         <td>{transaction.tether}</td>
//                         <td>{transaction.inr}</td>
//                         <td>{transaction.walletAddress}</td>
//                         <td>
//                           <span className="mode-tag">{transaction.mode}</span>
//                         </td>
//                         <td>
//                           <Button
//                             className={`status-btn1 ${transaction.status.toLowerCase().replace(" ", "-")}`}
//                             onClick={() => navigate("/TransactionsDetails")}
//                           >
//                             {transaction.status}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </div>
//         </Container>

//         {/* Footer */}
//         <footer className="text-center py-3" style={{ background: "#333", color: "#fff" }}>
//           <Container>
//             <p className="mb-0">© 2025 Richesse Currency Exchange, All Rights Reserved</p>
//             <p className="mb-0">
//               <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>Terms of Use</a> |
//               <a href="#privacy" style={{ color: "#fff", textDecoration: "none" }}> Privacy Policy</a>
//             </p>
//           </Container>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default Transaction;
