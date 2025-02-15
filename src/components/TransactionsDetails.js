import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import "./pay.css";
import doc from "../images/doc.png";

export default function TransactionDetailsPage() {
  return (
    <>
      <Navbar />
      <div className="transactions-history">
        {/* Header Section */}
        <div className="transactions-header">
          <h3>Transactions Details</h3>
        </div>
      <Container className="transaction-container d-flex flex-column justify-content-center align-items-center min-vh-100">
        
        <Card className="transaction-card">
          {/* Transaction Reference Number */}
          <Row className="row-item">
            <Col className="ref-num-div">
              <div className="d-flex">
                <p className="text-muted">Transaction Reference Number:</p>
                <span className="ref-number ms-2">
                  <strong>BT202502051001</strong>
                </span>
              </div>
            </Col>
            <Col className="text-end" xs="auto">
              <Button variant="outline-secondary" className="status-btn">
                CHECK STATUS IN BLOCKCHAIN
              </Button>
            </Col>
          </Row>

          {/* Personal Info Section */}
          <div className="section">
            <h5 className="section-title">Personal Info</h5>
            <Row className="row-item">
              <Col className="side-border">
                <span className="text-muted">User Name:</span> <br />
                <strong>Sai Charan SampathiRao</strong>
              </Col>
              <Col className="side-border">
                <span className="text-muted">Email ID:</span>
                <br />
                <strong>saicharansampathirao@gmail.com</strong>
              </Col>
              <Col className="side-border">
                <span className="text-muted">Wallet Type:</span>
                <br />
                <strong>TRC20</strong>
              </Col>
              <Col>
                <span className="text-muted">Wallet Address:</span>
                <br />
                <strong>sdfsdf</strong>
              </Col>
            </Row>
          </div>

          {/* Transaction Details Section */}
          <div className="section">
            <h5 className="section-title">Transaction Details</h5>
            <Row className="row-item">
              <Row className="row-item no-Border">
                <Col className="side-border">
                      <img
                        className="mr-2"
                        src="https://noriapay.com/images/icons/oval_buy.png"
                        alt="Rupee Icon"
                        width="30"
                        height="30"
                      />
                  <strong className="buy-label">BUY</strong>
                </Col>
                <Col className="side-border">
                <span className="text-muted">Tether:</span>
                <br />
                  <strong>100.00</strong> 
                </Col>
                <Col className="side-border">
                <span className="text-muted">INR:</span>
                <br />
                  <strong>9410.00</strong> 
                </Col>
                <Col className="side-border">
                <span className="text-muted">Network Fees:</span>
                <br />
                  <strong>1.20 USDT</strong> 
                </Col>
                <Col className="side-border">
                <span className="text-muted">Status:</span>
                <br />
                <span className="status-done">PAYMENT DONE</span>
                </Col>
                <Col>
                <span className="text-muted">Identification Amount:</span>
                <br />
                  <strong>1.81</strong>
                </Col>
              </Row>
              {/* 2nd row's 2nd row (nested) */}
              <Row className="justify-content-start" xs="auto">
                <Col className="side-border">
                  <span className="text-muted">INR Exchange Rate</span> <br />
                  <strong>94.10</strong>
                </Col>
                <Col className="side-border">
                  <span className="text-muted">Total Amount</span>
                  <br />
                  <strong>9524.73</strong>
                </Col>
              </Row>
            </Row>
          </div>

          {/* Payment Details Section */}
          <div className="section no-Border">
            <h5 className="section-title">Payment Details</h5>
            <Row className="justify-content-start" xs="auto">
                <Col className="side-border d-flex">
                <img
                  src="https://noriapay.com/images/icons/upi_home.png"
                  alt="UPI"
                  className="payment-logo"
                  width="30"
                  height="40"
                />
                <div className="ms-2 me-3">
                  <span className="text-muted">INR Exchange Rate</span> <br />
                  <strong>94.10</strong>
                </div>
                </Col>
                <Col className="side-border me-2">
                  <span className="text-muted">Payment Proof Document</span>
                  <br />
                  <img src={doc} alt="doc" width={25} height={25}/>
                </Col>
                <Col>
                  <span className="text-muted">Tether Recived Confirmation</span>
                  <br />
                  <strong>No</strong>
                </Col>
              </Row>
          </div>
        </Card>
      </Container>
      </div>
      
      <footer
              className="text-center py-3"
              style={{ background: "#333", color: "#fff" }}
            >
              <Container>
                <p className="mb-0">© 2025 Richesse Currency Exchange, All Rights Reserved</p>
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
}
