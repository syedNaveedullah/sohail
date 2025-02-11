import { Container, Card } from "react-bootstrap";
import Navbar from "./Navbar";
import "./pay.css";
import successIcon from "../images/success-icon.png";


export default function ReqSubmittedPage() {
  return (
    <>
      <Navbar />
      <div className="transactions-history">
        {/* Header Section */}
        <div className="transactions-header"  style={{height:'200px'}}>
        <h2>Payment (Bank)</h2>
        </div>
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 req-submitted-container">
        <Card className="text-center req-submitted-card">
          <div className="status-icon">
            <img src={successIcon} alt="Success Icon" />
          </div>
          <h3 className="mt-3">Buy Transaction Request Submitted</h3>
          <p className="text-muted">
            Your transaction request is submitted, you will receive an email once the transaction is processed.
          </p>
          <p className="text-muted">
            To check status in Blockchain, go to <b>Transactions {'>'} Details {'>'} CHECK STATUS IN BLOCKCHAIN</b>
          </p>
          <div className="note">
            <p><b>Note:</b> Processing times may vary depending on when your funds will be credited to us.</p>
          </div>
          <p className="support-text">
            For queries/support, please write to </p>
          <p className="link">
          <a href="mailto:support@noriapay.com">support@richesse.com</a>
          </p>
        </Card>
      </Container>
      </div>

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
}
