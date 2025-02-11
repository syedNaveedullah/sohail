import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import "./pay.css";
import richesseImage from '../images/richesse.jpg';

const Home = () => {
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [selectedAction, setSelectedAction] = useState("buy");
  const [inrAmount, setInrAmount] = useState(9406);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const exchangeRate = selectedAction === "buy" ? 94.06 : 89.38;
  const usdtAmount = (inrAmount / exchangeRate).toFixed(2);
  
  const navigate = useNavigate()

  const handleAuthModalShow = (isSignUp) => {
    if (isSignUp) {
      setShowSignUpModal(true);
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
      setShowSignUpModal(false);
    }
  };

  const handleAuthModalClose = () => {
    setShowSignUpModal(false);
    setShowLoginModal(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar
        expand="lg" 
        style={{ background: "linear-gradient(to right, #fcefdc, #fdb44b)" }}
        className="fixed-top"
      >
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
             src={richesseImage}
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
              alt="Logo"
            />
            <span className="fw-bold">Richesse Solutions</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="align-items-center">
              <Button
                variant="primary"
                className="px-4"
                style={{
                  border: "none",
                  color: "black",
                  fontWeight: "bold",
                  background: "transparent",
                }}
                onClick={() => handleAuthModalShow(false)}
              >
                LOGIN
              </Button>

              {/* Sign Up Button */}
              <Button
                variant="primary"
                className="px-4"
                style={{
                  borderRadius: "20px",
                  background: "#f2951d",
                  border: "none",
                }}
                onClick={() => handleAuthModalShow(true)}
              >
                SIGN UP
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="exchange-section">
      <Container >
          <Row className="align-items-center">
            <Col md={6} className="exchange-left">
              <h2>Buy & Sell USDT in INR With Local Bank Transfer</h2>
              <h5>Coins we support</h5>
              <div className="coin-support">
                <img
                  src="https://noriapay.com/images/icons/tether_img.png"
                  alt="Tether"
                  className="tether-logo"
                />
              </div>
              <br />
              <p className="payment-text">PAYMENT METHODS</p>
              <div className="payment-icons">
                <img
                  src="https://noriapay.com/images/icons/upi_home.png"
                  alt="UPI"
                  className="payment-logo"
                />
                <img
                  src="https://noriapay.com/images/icons/bank_transfer.png"
                  alt="Bank Transfer"
                  className="payment-logo"
                />
              </div>
            </Col>
            

            <Col md={6} className="exchange-box">
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


                <Button className="exchange-btn" variant="warning"  onClick={() => handleAuthModalShow(true)}
                 >
                  {selectedAction === "buy" ? "Exchange" : "Exchange"}
                </Button>
              </Form>
            </Col>
          
          </Row>
        </Container>
      </div>

      {/* How To Exchange Section */}
      <div
        className="how-to-exchange-section"
        style={{
          background: "linear-gradient(to right, #fcefdc, #fdb44b)",
          padding: "50px 0",
        }}
      >
        <Container>
          <h2 className="text-center mb-5">How To Exchange?</h2>
          <Row className="text-center">
            {/* Step 1 */}
            <Col md={4} className="mb-4">
              <div className="step-circle">01</div>
              <h4>Sign Up Your Account</h4>
              <p>Create your account with Notiopsy.</p>
            </Col>

            {/* Step 2 */}
            <Col md={4} className="mb-4">
              <div className="step-circle">02</div>
              <h4>Verify Your Account</h4>
              <p>Complete KYC verification.</p>
            </Col>

            {/* Step 3 */}
            <Col md={4} className="mb-4">
              <div className="step-circle">03</div>
              <h4>Enter The Amount</h4>
              <p>Specify the amount of USDT you wish to buy/sell.</p>
            </Col>
          </Row>

          <Row className="text-center">
            {/* Step 4 */}
            <Col md={6} className="mb-4">
              <div className="step-circle">04</div>
              <h4>Complete The Transfer</h4>
              <p>Transfer the INR amount to complete the transaction.</p>
            </Col>

            {/* Step 5 */}
            <Col md={6} className="mb-4">
              <div className="step-circle">05</div>
              <h4>Receive USDT/INR</h4>
              <p>
                Once the transfer is confirmed, you will receive the USDT/INR.
              </p>
            </Col>
          </Row>

          {/* Sign Up Button */}
          <div className="text-center mt-5">
            <Button
              variant="primary"
              style={{
                borderRadius: "20px",
                background: "#f2951d",
                border: "none",
                padding: "10px 30px",
              }}
              onClick={() => handleAuthModalShow(true)}
            >
              SIGN UP
            </Button>
          </div>
        </Container>
      </div>

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

      <SignUpModal
        show={showSignUpModal}
        handleClose={() => setShowSignUpModal(false)}
      />

      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Home;
