import React, { useState } from "react";
import { Container, Row, Col, Card, Button,  ToggleButton,
  ToggleButtonGroup, Form } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import CustomNavbar from "./Navbar"; 
import "./pay.css"; 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate()
  const [selectedMethod, setSelectedMethod] = useState(1);
    const [selectedAction, setSelectedAction] = useState("buy");
    const [inrAmount, setInrAmount] = useState(9406);

    const exchangeRate = selectedAction === "buy" ? 94.06 : 89.38;
  const usdtAmount = (inrAmount / exchangeRate).toFixed(2);
  return (
    <>
   
      <CustomNavbar />

      
      <div className="header-section d-flex align-items-center">
        <Container>
          <h2 className="greeting-text">Good Morning, CHARAN</h2>
        </Container>
      </div>

      <Container fluid className="mt-4 px-4">
        <Row className="justify-content-center">
          {/* Left Section - Notifications */}
          <Col lg={8} md={12}>
            {/* Important Notification */}
            <Card className="mb-3 border-0 notification-card">
              <Card.Body>
                <Card.Title className="text-danger fw-bold">
                  IMPORTANT NOTIFICATION – CHANGE IN BANK & UPI DETAILS
                </Card.Title>
                <Card.Text>
                  We have updated new bank account and UPI ID details for your buy
                  transactions. Please ensure all future fund transfers are made
                  to these updated account details. You can find the new details
                  on the checkout screen.
                </Card.Text>
                <Card.Text className="text-danger fw-bold">
                  Kindly note that the previous bank account and UPI ID are now
                  obsolete and no longer operational.
                </Card.Text>
              </Card.Body>
            </Card>

            {/* KYC Pending */}
            <Card className="mb-3 border-0 kyc-card">
              <Card.Body>
                <Card.Title className="text-danger fw-bold">
                  Your KYC approval is pending
                </Card.Title>
                <Card.Text>You will be notified once the approval is completed</Card.Text>
              </Card.Body>
            </Card>

            {/* No Transactions */}
            <Card className="mb-3 border-0 transaction-card1">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <span>There are no transactions at the moment. Make your first exchange!</span>
                <Button variant="danger">Exchange</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Section - Exchange Box */}
          <Col lg={4} md={12}>
            <Card className="exchange-card p-3">
             <div className="buy-sell-toggle">
                             <Button
                               variant={selectedAction === "buy" ? "warning" : "light"}
                               onClick={() => setSelectedAction("buy")}
                             >
                               Buy USDT
                             </Button>
                             <Button
                               variant={selectedAction === "sell" ? "warning" : "light"}
                               onClick={() => setSelectedAction("sell")}
                             >
                               Sell USDT
                             </Button>
                           </div>

              {/* Payment Methods */}
              <Form className="exchange-form">
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={selectedMethod}
                  onChange={setSelectedMethod}
                  style={{ gap: "10px" }}
                >
                  <ToggleButton
                    id="toggle-upi"
                    value={1}
                    className={`custom-toggle-button ${
                      selectedMethod === 1 ? "active" : ""
                    }`}
                  >
                    UPI
                  </ToggleButton>
                  <ToggleButton
                    id="toggle-bank"
                    value={2}
                    className={`custom-toggle-button ${
                      selectedMethod === 2 ? "active" : ""
                    }`}
                  >
                    Bank Account
                  </ToggleButton>
                </ToggleButtonGroup>

                <br />
                <br />
                <p className="rate-text">
                  1 USDT is Roughly <strong>{exchangeRate} INR</strong>
                </p>

<Form.Group className="mb-3">
    <Form.Label>{selectedAction === "buy" ? "You Pay" : "You Receive"}</Form.Label>
    <div className="input-group">
      <Form.Control
        type="number"
        placeholder="Enter amount"
        value={inrAmount}
        onChange={(e) => setInrAmount(e.target.value)}
      />
      <span className="input-group-text"><FaRupeeSign /></span>
    </div>
  </Form.Group>

  {/* Conversion Arrow */}
  <div className="text-center text-muted mb-3">⇅</div>

  {/* You Will Receive (Input Group with USDT) */}
  <Form.Group className="mb-3">
    <Form.Label>{selectedAction === "buy" ? "You Will Receive Roughly" : "You Pay"}</Form.Label>
    <div className="input-group">
      <Form.Control type="number" placeholder="Enter amount" value={usdtAmount} readOnly />
      <span className="input-group-text"><SiTether /></span>
    </div>
  </Form.Group>


                <Button className="exchange-btn" onClick={()=>navigate("/buy")} variant="warning">
                  {selectedAction === "buy" ? "Exchange" : "Exchange"}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      
       {/* Footer */}
            <footer
              className="text-center py-3"
              style={{ background: "#333", color: "#fff" }}
            >
              <Container>
                <p className="mb-0">© 2025 Richesse Solutions, All Rights Reserved</p>
                <p className="mb-0">
                  <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>
                    Terms of Use
                  </a>{" "}
                  |
                  <a
                    href="#privacy"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    {" "}
                    Privacy Policy
                  </a>
                </p>
              </Container>
            </footer>
    </>
    
  );
};



export default Dashboard;
