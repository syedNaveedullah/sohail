import { useState, useEffect } from "react";
import { Card, Button, Form, Alert, Container, Row } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";
import './pay.css';
import qrImg from "../images/qr-img.png";
import Navbar from "./Navbar";

export default function PaymentPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes countdown
  const [file, setFile] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

// timer func
useEffect(() => {
  if (timeLeft <= 0) return;
  const interval = setInterval(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);
  return () => clearInterval(interval);
}, [timeLeft]);

// *******************************

// ***********file upload****************
const [fileName, setFileName] = useState("");

// const handleFileChange = (event) => {
//   setFile(event.target.files[0]);
// };


  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
        handleFileUpload(file);
      }
    };
    // ***********************************

      
  const handleConfirm = () => {
    if (isPaid && file) {
      alert("Payment confirmed!");
    } else {
      alert("Please complete all steps.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="transactions-history">
        {/* Header Section */}
        <div className="transactions-header">
        <h2>Payment (Bank)</h2>
        </div>
      {/*  */}
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light payment-container" >
        <Card className="w-100 payment-card" style={{ transform: "translateY(-15%)" }}>
          <Row className="mb-3">
            <div className="d-flex align-items-center">
              <Button variant="success" className="buy-button">
                Buy
              </Button>
              <p className="mt-3 ms-2 text-muted">
                Transaction Reference: <b>BT202502051001</b>
              </p>
            </div>
          </Row>

          {/* timer */}
          <p className="expiry-text">
            This transaction window will expire in{" "}
            <strong>
              {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
            </strong>
          </p>

          {/*  */}

          <Alert
            variant="warning"
            className="d-flex justify-content-between total-alert">
            Total Payable: <span className="text-danger">₹9524.73 INR</span>
          </Alert>

          <Card.Body>
            <h5 className="step-title">STEP 1: TRANSFER THROUGH UPI</h5>

            <div className="d-flex mt-4 step1-div">
              <div className="upi-img">
                <img
                  src="https://noriapay.com/images/icons/upi_home.png"
                  alt="UPI"
                  className="payment-logo"
                />
              </div>

              <div className="ms-3">
                <p className="text-muted tag mb-0">UPI Address:</p>
                <p className="upi-address">
                  SHRI.eazypay@icici
                </p>
              </div>

              {/* Move this to the end using ms-auto */}
              <div className="qr-img-div ms-auto">
                <img
                  src={qrImg}
                  alt="QR Code"
                  className="d-block mx-auto qr-code"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* file uploader****************************************************************************** */}
            <h5 className="mt-3 mb-3 step-title">
              STEP 2: ATTACH PROOF OF TRANSFER
            </h5>
            <div
              className="upload-container mb-3"
              onClick={() => document.getElementById("fileInput").click()}>
              <FaPaperclip className="upload-icon" />
              <div className="upload-text">
                {fileName ||
                  "Drop/Upload a proof that the money has been transferred. We accept .jpg, .png, .pdf files less than 10MB."}
              </div>
              <Form.Control
                type="file"
                id="fileInput"
                accept=".jpg,.png,.pdf"
                onChange={handleChange}
                className="file-input"
                hidden
              />
            </div>
            {/* ********************************************************************* */}

            <Form.Group controlId="paidCheck" className="mb-3">
              <Form.Check
                type="checkbox"
                label="I HAVE PAID"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="paid-checkbox"
              />
            </Form.Group>

            <Button
              onClick={handleConfirm}
              className="w-100 confirm-button"
              variant="warning">
              CONFIRM
            </Button>
          </Card.Body>
        </Card>

        {/* imp notes */}
      <div className="d-flex align-items-start justify-content-start w-50 text-start">
        <div className="additional-info mt-4">
            <h4 className="info-heading">Important Notes:</h4>
            <ol className="info-list">
              <li>We only accept transfers by IMPS , NEFT & RTGS. CASH DEPOSITS ARE NOT ALLOWED.</li>
              <li>If you transfer a different amount or deposit funds to different account by mistake , we will not be responsible.</li>
              <li>Adding the Transaction Reference Number in your transfer comments is mandatory.</li>
              <li>In case of any errors , please write to support@noriapay.com</li>
            </ol>
          </div>
        </div>
      </Container>
      </div>

       {/* Footer */}
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
