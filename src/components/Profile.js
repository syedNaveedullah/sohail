
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./Navbar";
import { Modal, Button, Form, InputGroup,Container} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./pay.css";
import richesseImage from '../images/richesse.jpg';
import useProfile from "../hooks/callProfile";
import FullNameModal from "./changeProfile";
import ChangePasswordModal from "./ChangePasswordModal";

// ProfileCard Component
const ProfileCard = () => {
  
  const { data: profile } = useProfile();

  return (
    <div className="card profile-card text-center">
      <div className="card-body">
        <div className="pro-img">
          <img src={richesseImage} alt="Profile" />
        </div>
        <h3 className="pb-2 profile-name">{profile?.FullName || "Guest"}</h3>
        <hr />
        <div className="row">
        {/* <Col className="side-border"> */}
          <div className="col-md-6 col-sm-12 col-6 border-right">
            <small><b>Mobile Number:</b></small>
            <br />
            <p className="status-text">
              <span className="status_label verified">Verified</span>
            </p>
          </div>
          {/* </Col> */}
          <div className="col-md-6 col-sm-12 col-6">
            <small><b>KYC Status:</b></small>
            <br />
            <p className="status-text">
              <span className="status_label pending">Pending</span>
            </p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

// KYCTab Component
const KYCTab = () => {
    const [selectedID, setSelectedID] = useState("Driving License");
    const [isVerified, setIsVerified] = useState(false);
    const [frontFile, setFrontFile] = useState(null);
    const [backFile, setBackFile] = useState(null);
  
    const handleFileChange = (event, setFile) => {
      const selectedFile = event.target.files[0];
  
      if (selectedFile) {
        const fileType = selectedFile.type;
        const fileSize = selectedFile.size / 1024 / 1024; // Convert size to MB
  
        if (!["image/jpeg", "image/png", "application/pdf"].includes(fileType)) {
          alert("Only JPEG, PNG, and PDF files are allowed.");
          return;
        }
  
        if (fileSize > 10) {
          alert("File size should be less than 10MB.");
          return;
        }
  
        setFile(selectedFile);
      }
    };
  
    return (
      <div className="kyc-container">
        <h4 className="kyc-title">UPLOAD ID PROOF</h4>
        <p className="kyc-subtitle">
          Please upload any one of the documents from the list below
        </p>
        <div className="id-proof-tabs">
          {[
            "Driving License",
            "Passport",
            "Aadhaar Card"
          ].map((id) => (
            <button
              key={id}
              className={`id-tab ${selectedID === id ? "active" : ""}`}
              onClick={() => setSelectedID(id)}
            >
              {id}
            </button>
          ))}
        </div>
  
        <div className="upload-section">
      {/* FRONT DOCUMENT UPLOAD */}
      <div className="upload-box">
        <p>Upload {selectedID} Front</p>
        <p className="file-note">NOTE: Only (JPEG/PNG/PDF) file types are allowed and MAX size: 10MB</p>
        <label className="drag-upload">
          Drag document here or <span className="browse">browse</span> to upload
          <input
            type="file"
            accept="image/jpeg, image/png, application/pdf"
            onChange={(e) => handleFileChange(e, setFrontFile)}
            className="file-input"
          />
        </label>
        {frontFile && <p className="file-name">Selected: {frontFile.name}</p>}
      </div>

      {/* BACK DOCUMENT UPLOAD */}
      <div className="upload-box">
        <p>Upload {selectedID} Back</p>
        <p className="file-note">NOTE: Only (JPEG/PNG/PDF) file types are allowed and MAX size: 10MB</p>
        <label className="drag-upload">
          Drag document here or <span className="browse">browse</span> to upload
          <input
            type="file"
            accept="image/jpeg, image/png, application/pdf"
            onChange={(e) => handleFileChange(e, setBackFile)}
            className="file-input"
          />
        </label>
        {backFile && <p className="file-name">Selected: {backFile.name}</p>}
      </div>
    </div>
  
        <Form.Group className="phone-verification">
          <Form.Label>Phone Number</Form.Label>
          <div className="phone-input">
          <InputGroup className="search-input">
          <InputGroup.Text>
              IND +91
            </InputGroup.Text>
            <Form.Control type="text" />

            <span className={`verify-status ${isVerified ? "verified" : "not-verified"}`} onClick={() => setIsVerified(!isVerified)}>
              {isVerified ? "Verified" : "Verify"}
            </span>

          </InputGroup>
            
          </div>
        </Form.Group>
        <br/>
        <Button className="search-btn">SEND DETAILS</Button>
      </div>
    );
  };


const ProfileTab = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [data, setData] = useState({
      crypto: null,
      bank: null,
      upi: null,
    });
  
    const handleShow = (section) => {
      setActiveSection(section);
      setShowModal(true);
    };
  
    const handleClose = () => setShowModal(false);
  
    const handleSave = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newData = Object.fromEntries(formData);
      setData((prev) => ({ ...prev, [activeSection]: newData }));
      handleClose();
    };

    const { data: profile, isLoading, isError } = useProfile();    

    if (isLoading) return <p>Loading profile...</p>;
    if (isError) return <p>Error loading profile</p>;

    // Handle missing values
    const userData = {
        fullName: profile?.FullName || "N/A",
        email: profile?.Email || "N/A",
        phoneNumber: profile?.Phone || "N/A",
        userID: profile?.UserID || "N/A",
        kycStatus: profile?.KYC_Status || "N/A",
        isEmailVerified: profile?.isEmailVerified ? "Yes" : "No",
    };

    // console.log(userData);
    return (
      <div className="container mt-4">
        <h5 className="text-uppercase">Personal Information</h5>
        <div className="personal-info">
          <p>
            <strong>Full Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.phoneNumber}
          </p>
          <p>
            <strong>UserID:</strong> {userData.userID}
          </p>
          <p>
            <strong>KYC_Status:</strong> {userData.kycStatus}
          </p>
          <p>
            <strong>isEmailVerified:</strong> {userData.isEmailVerified}
          </p>
        </div>{" "}
        <br />
        <h5 className="text-uppercase">Crypto Wallet Type</h5>
        {data.crypto ? (
          <div className="d-flex justify-content-between align-items-center border p-3 rounded">
            <strong>{data.crypto.walletName}</strong>
            <div>
              <FaEdit
                className="text-warning me-2"
                onClick={() => handleShow("crypto")}
              />
              <FaTrash
                className="text-danger"
                onClick={() => setData({ ...data, crypto: null })}
              />
            </div>
          </div>
        ) : (
          <p className="text-muted d-flex justify-content-between align-items-center">
            No details to show
            <FaPlus
              className="text-primary ms-2"
              onClick={() => handleShow("crypto")}
            />
          </p>
        )}
        <h5 className="text-uppercase mt-4">Bank Account Details</h5>
        {data.bank ? (
          <div className="d-flex justify-content-between align-items-center border p-3 rounded">
            <strong>{data.bank.accountName}</strong>
            <div>
              <FaEdit
                className="text-warning me-2"
                onClick={() => handleShow("bank")}
              />
              <FaTrash
                className="text-danger"
                onClick={() => setData({ ...data, bank: null })}
              />
            </div>
          </div>
        ) : (
          <p className="text-muted d-flex justify-content-between align-items-center">
            No details to show{" "}
            <FaPlus
              className="text-primary ms-2"
              onClick={() => handleShow("bank")}
            />
          </p>
        )}
        <h5 className="text-uppercase mt-4">UPI Details</h5>
        {data.upi ? (
          <div className="d-flex justify-content-between align-items-center border p-3 rounded">
            <strong>{data.upi.upiAddress}</strong>
            <div>
              <FaEdit
                className="text-warning me-2"
                onClick={() => handleShow("upi")}
              />
              <FaTrash
                className="text-danger"
                onClick={() => setData({ ...data, upi: null })}
              />
            </div>
          </div>
        ) : (
          <p className="text-muted d-flex justify-content-between align-items-center">
            No details to show{" "}
            <FaPlus
              className="text-primary ms-2"
              onClick={() => handleShow("upi")}
            />
          </p>
        )}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Add{" "}
              {activeSection === "crypto"
                ? "Tether Wallet"
                : activeSection === "bank"
                ? "Bank Account"
                : "UPI Details"}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSave}>
            <Modal.Body>
              {activeSection === "crypto" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      SELECT WALLET TYPE
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Check
                        type="radio"
                        label="BEP20"
                        name="walletType"
                        value="BEP20"
                        required
                        inline
                      />
                      <Form.Check
                        type="radio"
                        label="ERC20"
                        name="walletType"
                        value="ERC20"
                        required
                        inline
                      />
                      <Form.Check
                        type="radio"
                        label="TRC20"
                        name="walletType"
                        value="TRC20"
                        required
                        inline
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Crypto Wallet Name</Form.Label>
                    <Form.Control name="walletName" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Crypto Wallet Address</Form.Label>
                    <Form.Control name="walletAddress" required />
                  </Form.Group>
                </>
              )}
              {activeSection === "bank" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Bank Name</Form.Label>
                      <Form.Control name="bankName" required />
                    </Form.Group>
                    <Form.Label>Bank Account Name</Form.Label>
                    <Form.Control name="accountName" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Account Number</Form.Label>
                    <Form.Control name="bankName" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>ISFC Code</Form.Label>
                    <Form.Control name="bankName" required />
                  </Form.Group>
                  <div className="file-upload-section">
                    <label>
                      Bank Account Proof (Upload statement or cheque)
                    </label>
                    <p className="file-note">
                      <span className="text-danger">
                        NOTE: Only (JPEG/PNG/PDF) file types are allowed and MAX
                        size: 10MB
                      </span>
                    </p>

                    <div className="custom-file">
                      <input
                        type="file"
                        id="file1"
                        className="custom-file-input"
                      />
                      <label htmlFor="file1" className="custom-file-label">
                        Browse File
                      </label>
                    </div>
                  </div>
                </>
              )}
              {activeSection === "upi" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>UPI Address</Form.Label>
                    <Form.Control name="upiAddress" required />
                  </Form.Group>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={handleClose}>Close</Button> */}
              <Button className="search-btn" type="submit" variant="warning">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  };

// SettingsTab Component
const SettingsTab = () => {
  const [showFullNameModal, setShowFullNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [data, setData] = useState({ fullName: "" });

  const handleSaveFullName = (newData) => {
    setData((prev) => ({ ...prev, fullName: newData.fullName }));
    setShowFullNameModal(false);
  };

  return (
    <div className="container mt-4">
      <h5 className="text-uppercase">Change Profile</h5>
      <p className="text-muted d-flex justify-content-between align-items-center">
        You can only change your Full Name
        <FaPlus className="text-primary ms-2" onClick={() => setShowFullNameModal(true)} />
      </p>

      <h5 className="text-uppercase mt-4">Change Password</h5>
      <p className="text-muted d-flex justify-content-between align-items-center">
        You have to know your Old Password
        <FaPlus className="text-primary ms-2" onClick={() => setShowPasswordModal(true)} />
      </p>

      {/* Modals */}
      <FullNameModal
        show={showFullNameModal}
        handleClose={() => setShowFullNameModal(false)}
        handleSave={handleSaveFullName}
      />
      <ChangePasswordModal
        show={showPasswordModal}
        handleClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

// EDDTab Component
  const EDDTab = () => {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <div className="edd-container">
        <h6 className="edd-heading">CURRENT EDD LIMIT FOR THIS ACCOUNT</h6>  
        <p className="edd-description">
          EDD limit is the maximum amount of USDT to BUY or SELL. If you want to extend the limit, you can increase the limit by uploading the proof of income document.
        </p>  <br/>
  
        <div className="row">
          <div className="col-md-6">
            <label style={{fontWeight:'bold'}}>BUY Limit</label>
            <input type="text" className="form-control edd-input" value="5000 USDT" readOnly />
          </div>
          <div className="col-md-6">
            <label style={{fontWeight:'bold'}}>SELL Limit</label>
            <input type="text" className="form-control edd-input" value="5000 USDT" readOnly />
          </div>
        </div>
    <br/>
        <div className="row mt-3">
          <div className="col-md-6">
            <label style={{fontWeight:'bold'}}>BUY Limit Used</label>
            <input type="text" className="form-control edd-input" value="0 USDT" readOnly />
          </div>
          <div className="col-md-6">
            <label style={{fontWeight:'bold'}}>SELL Limit Used</label>
            <input type="text" className="form-control edd-input" value="0 USDT" readOnly />
          </div>
        </div>
  
        <button className="increase-btn mt-4" onClick={() => setShowModal(true)}>
          INCREASE LIMIT
        </button>
  
        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Enhanced Due Diligence</h5>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" className="close" onClick={() => setShowModal(false)}>
                &times;
            </button>
            </div>
                </div>
                <div className="modal-body">
                  <p className="modal-description">
                    As with any financial transactions crossing a certain threshold, we are required to complete additional checks for all our customers.
                  </p>
                  <p><strong>Important points:</strong></p>
                  <ul>
                    <li>The bank statement must be an official statement. Screenshots or Excel files will not be accepted.</li>
                    <li>Your name must be visible on the bank statement.</li>
                    <li>Do not send compressed files and send each document as an individual attachment.</li>
                  </ul>
  
                  <label>Current occupation details</label>
                  <textarea className="form-control" rows="2"></textarea>
  
                  <label>Details of all sources of wealth</label>
                  <textarea className="form-control" rows="2"></textarea>  <br/>
  
                  <div className="file-upload-section">
  <label>Documents justifying the sources of funds along with the last six months' bank statements.</label>
  <p className="file-note">
    <span className="text-danger">NOTE: Only (JPEG/PNG/PDF) file types are allowed and MAX size: 10MB</span>
  </p>
  
  <div className="custom-file">
    <input type="file" id="file1" className="custom-file-input" />
    <label htmlFor="file1" className="custom-file-label">Browse File</label>
  </div>
</div>

<div className="file-upload-section">
  <label>Kindly provide the last 2 years filled ITR showing all the sections.</label>
  <p className="file-note">
    <span className="text-danger">NOTE: Only (JPEG/PNG/PDF) file types are allowed and MAX size: 10MB</span>
  </p>
  
  <div className="custom-file">
    <input type="file" id="file2" className="custom-file-input" />
    <label htmlFor="file2" className="custom-file-label">Browse File</label>
  </div>
</div>

<div className="file-upload-section">
  <label>Selfie image - Please take a selfie with your face clearly visible as well as you holding up the ID document (Adhaar or PAN Card)</label>
  <p className="file-note">
    <span className="text-danger">NOTE: Only (JPEG/PNG/PDF) file types are allowed and MAX size: 10MB</span>
  </p>
  
  <div className="custom-file">
    <input type="file" id="file3" className="custom-file-input" />
    <label htmlFor="file3" className="custom-file-label">Browse File</label>
  </div>
</div>


  
                </div>
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button> */}
                  <button type="button" className="increase-btn mt-4" style={{borderRadius:'25px'}}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

// Profile Component
const Profile = () => {
  const [activeTab, setActiveTab] = useState("KYC");

  return (
    <>
      <CustomNavbar />
      <div className="transactions-history">
        <div className="transactions-header">
          <h3>User Profile</h3>
        </div>

        <div className="row mt-3">
          <div className="col-lg-4 col-md-4 col-xs-12">
            <ProfileCard />
          </div>

          <div className="col-lg-8 col-md-8 col-xs-12">
            <p id="Page_MsgBox"></p>
            <div className="card1">
              <ul className="nav nav-tabs profile-tab" role="tablist">
                {['KYC', 'Profile', 'Settings', 'EDD'].map(tab => (
                  <li className="nav-item" key={tab}>
                    <button className={`nav-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tab-content">
                {activeTab === "KYC" && <KYCTab />}
                {activeTab === "Profile" && <ProfileTab />}
                {activeTab === "Settings" && <SettingsTab />}
                {activeTab === "EDD" && <EDDTab />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <br/>
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
};

export default Profile;