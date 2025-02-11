
// import React, { useState } from "react";
// import { Container, Row, Col, Card, Button, Form, ToggleButton, ToggleButtonGroup, InputGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaRupeeSign } from "react-icons/fa";
// import { SiTether } from "react-icons/si";
// import "./pay.css";
// import CustomNavbar from "./Navbar";
 
// const Buy = () => {
//   // const [amount, setAmount] = useState(9410);
//   // const [usdt, setUsdt] = useState(100);
//   const [wallet, setWallet] = useState("");
//   const [coupon, setCoupon] = useState("");

//   const [selected, setSelected] = useState("buy");
//   const [selectedMethod, setSelectedMethod] = useState(1);
//   const [selectedAction, setSelectedAction] = useState("buy");
//   const [enterAmount, setEnterAmount] = useState(9406);

//   const exchangeRate = selectedAction === "buy" ? 94.06 : 89.38;
//   const recivingAmount = (enterAmount / exchangeRate).toFixed(2);
  
//   return (
//     <>
//       <CustomNavbar />
//       <div className="transactions-history">
//         {/* Header Section */}
//         <div className="transactions-header" style={{ height: "230px" }}>
//           <h2>Checkout</h2>
//         </div>
//         {/* ****************************** */}
//         <div className="buy-section">
//           <Container className="mt-5" style={{ transform: "translateY(-20%)" }}>
//             <Row>
//               {/* Left Section - Buy USDT */}
//               <Col md={6}>
//                 <Card>
//                   <Card.Body>
//                     {/* ********************left top ************************** */}
//                     <div className="toggle-container">
//                       <Button
//                         className={`toggle-btn ${
//                           selected === "buy" ? "active" : ""
//                         }`}
//                         onClick={() => setSelected("buy")}>
//                         <img
//                           src="https://noriapay.com/images/noriapay_extracted_logos/sell_new.svg"
//                           alt="Buy"
//                           className="toggle-icon"
//                         />
//                         <span>Buy</span> <br />
//                         <small>USDT</small>
//                       </Button>

//                       <Button
//                         className={`toggle-btn ${
//                           selected === "sell" ? "active" : ""
//                         }`}
//                         onClick={() => setSelected("sell")}>
//                         <img
//                           src="https://noriapay.com/images/noriapay_extracted_logos/buy_new.svg"
//                           alt="Sell"
//                           className="toggle-icon"
//                         />
//                         <span>Sell</span> <br />
//                         <small>USDT</small>
//                       </Button>
//                     </div>
//                     {/* ******************************************************* */}
                    // <Form className="exchange-form">
                    //   <br />
                    //   <br />
                    //   <p className="rate-text">
                    //     1 USDT is Roughly <strong>{exchangeRate} INR</strong>
                    //   </p>
                    //   <Form.Group className="mb-3">
                    //     <Form.Label>
                    //       {selectedAction === "buy" ? "You Pay" : "You Receive"}
                    //     </Form.Label>
                    //     <div className="input-group">
                    //       <Form.Control
                    //         type="number"
                    //         placeholder="Enter amount"
                    //         value={enterAmount}
                    //         onChange={(e) => setEnterAmount(e.target.value)}
                    //       />
                    //       <span className="input-group-text">
                    //         <FaRupeeSign />
                    //       </span>
                    //     </div>
                    //   </Form.Group>
                    //   {/* Conversion Arrow */}
                    //   <div className="text-center text-muted mb-3">⇅</div>
                    //   {/* You Will Receive (Input Group with USDT) */}
                    //   <Form.Group className="mb-3">
                    //     <Form.Label>
                    //       {selectedAction === "buy"
                    //         ? "You Will Receive Roughly"
                    //         : "You Pay"}
                    //     </Form.Label>
                    //     <div className="input-group">
                    //       <Form.Control
                    //         type="number"
                    //         placeholder="Enter amount"
                    //         value={recivingAmount}
                    //         readOnly
                    //       />
                    //       <span className="input-group-text">
                    //         <SiTether />
                    //       </span>
                    //     </div>
                    //   </Form.Group>
                    //   <br />
                    //   <ToggleButtonGroup
                    //     type="radio"
                    //     name="options"
                    //     value={selectedMethod}
                    //     onChange={setSelectedMethod}
                    //     style={{ gap: "10px" }}>
                    //     <ToggleButton
                    //       id="toggle-upi"
                    //       value={1}
                    //       className={`custom-toggle-button ${
                    //         selectedMethod === 1 ? "active" : ""
                    //       }`}>
                    //       UPI
                    //     </ToggleButton>
                    //     <ToggleButton
                    //       id="toggle-bank"
                    //       value={2}
                    //       className={`custom-toggle-button ${
                    //         selectedMethod === 2 ? "active" : ""
                    //       }`}>
                    //       Bank Account
                    //     </ToggleButton>
                    //   </ToggleButtonGroup>
                    //   <br /> <br />
                    //   {/* ******************************************************************** */}
                    //   <Form.Group className="mb-3">
                    //     <Form.Label>
                    //       Where should we transfer your Tether?
                    //     </Form.Label>
                    //     <Form.Control
                    //       type="text"
                    //       placeholder="Select tether wallet"
                    //       value={wallet}
                    //       onChange={(e) => setWallet(e.target.value)}
                    //     />
                    //   </Form.Group>
                    //   <Form.Group className="mb-3">
                    //     <Form.Label>Tether Wallet Address</Form.Label>
                    //     <Form.Control
                    //       type="text"
                    //       placeholder="Enter tether wallet address"
                    //     />
                    //   </Form.Group>
                    //   <Form.Check
                    //     type="checkbox"
                    //     label="I verify that this wallet address belongs to me."
                    //     className="mb-3"
                    //   />
                    // </Form>
//                   </Card.Body>
//                 </Card>
//               </Col>

//               {/* Right Section - Exchange Information */}
//               <Col md={6}>
//                 <Card>
//                   <Card.Body>
//                     <div className="box">
//                       <h5 className="mb-3">Exchange Information</h5>
//                     </div>
//                     {/*  */}
//                     <div className="box d-flex justify-content-between">
//                       <div>
//                         <div className="d-flex ">
//                           <img
//                             className="mr-2"
//                             src="https://noriapay.com/images/icons/oval_buy.png"
//                             alt="Rupee Icon"
//                             width="20"
//                             height="20"
//                           />
//                           <p className="text-success ms-2">
//                             <strong>Buy</strong>
//                           </p>
//                         </div>
//                         <p>
//                           <strong>100 USDT</strong> (1 USDT = INR 94.1)
//                         </p>
//                       </div>
//                       <div>
//                         <p>
//                           🕐 Processing Time <br></br>{" "}
//                           <strong>
//                             {" "}
//                             &nbsp;&nbsp;&nbsp;&nbsp; 30 min - 1hr{" "}
//                           </strong>
//                         </p>
//                       </div>
//                     </div>
//                     {/*  */}
//                     <div className="box">
//                       <div className="d-flex justify-content-between">
//                         <strong>Tether to Receive:</strong>
//                         <p> 100 USDT </p>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <strong>Network Fee:</strong>
//                         <p> 0 USDT </p>
//                       </div>
//                     </div>
//                     {/*  */}
//                     <p>
//                       <strong>Identification Amount:</strong> 1.81 INR
//                     </p>
//                     <p className="light-para">
//                       Note: Identification Amount is added to identify the
//                       transaction on our end.
//                     </p>
//                     <div className="box">
//                       <Form.Group className="mb-3">
//                         {/* <Form.Label>Enter Coupon Code</Form.Label> */}
//                         <InputGroup>
//                           <Form.Control
//                             type="text"
//                             placeholder="Enter Coupon Code"
//                             value={coupon}
//                             onChange={(e) => setCoupon(e.target.value)}
//                           />
//                           <Button
//                             variant="outline-primary"
//                             style={{
//                               color: "#fdb44b",
//                               border: "1px solid #fdb44b",
//                             }}>
//                             Apply
//                           </Button>
//                         </InputGroup>
//                       </Form.Group>
//                     </div>
//                     <div className="box d-flex justify-content-between orange-bg">
//                       <h5> Total Payable:</h5>
//                       <h5>9411.81 INR</h5>
//                     </div>
//                     <div className="d-flex flex-row-reverse">
//                       <Button className="mt-2 rounded-pill btn-grad">
//                         {" "}
//                         <strong>Confirm</strong>
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//       {/* Footer */}
//       <footer
//         className="text-center py-3"
//         style={{ background: "#333", color: "#fff" }}>
//         <Container>
//           <p className="mb-0">© 2025 Richesse Solutions, All Rights Reserved</p>
//           <p className="mb-0">
//             <a href="#terms" style={{ color: "#fff", textDecoration: "none" }}>
//               Terms of Use
//             </a>{" "}
//             |
//             <a
//               href="#privacy"
//               style={{ color: "#fff", textDecoration: "none" }}>
//               {" "}
//               Privacy Policy
//             </a>
//           </p>
//         </Container>
//       </footer>
//     </>
//   );
// };

// export default Buy;


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////




import React, { use, useState } from "react";
import { Container, Row, Col, Card, Button, Form, ToggleButton, ToggleButtonGroup, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRupeeSign } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import "./pay.css";
import CustomNavbar from "./Navbar";

const BuySell = () => {
  const [selectedAction, setSelectedAction] = useState("buy");
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [enterAmount, setEnterAmount] = useState();
  // const [wallet, setWallet] = useState("");
  const [coupon, setCoupon] = useState("");
  const [netWorkFeeINR, setNetWorkFeeINR] = useState(2.0);
  const [netWorkFeeUSD, setNetWorkFeeUSD] = useState(1.6);

  const exchangeRate = selectedAction === "buy" ? 94.06 : 89.38;
  const usdtCurrency=enterAmount/exchangeRate;
  const indiacurrency = exchangeRate * enterAmount;

  return (
    <>
      <CustomNavbar />
      <div className="transactions-history">
        <div className="transactions-header" style={{ height: "230px" }}>
          <h2>Checkout</h2>
        </div>
        <div className="buy-section">
          <Container className="mt-5" style={{ transform: "translateY(-20%)" }}>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <div className="toggle-container">
                      <Button
                        className={`toggle-btn ${
                          selectedAction === "buy" ? "active" : ""
                        }`}
                        onClick={() => setSelectedAction("buy")}>
                        <span>Buy</span> <br />
                        <small>USDT</small>
                      </Button>
                      <Button
                        className={`toggle-btn ${
                          selectedAction === "sell" ? "active" : ""
                        }`}
                        onClick={() => setSelectedAction("sell")}>
                        <span>Sell</span> <br />
                        <small>USDT</small>
                      </Button>
                    </div>

                    {selectedAction === "buy" ? (
                      <>
                        <Form className="exchange-form">
                          <br />
                          <br />
                          <p className="rate-text">
                            1 USDT is Roughly{" "}
                            <strong>{exchangeRate} INR</strong>
                          </p>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              {selectedAction === "buy"
                                ? "You Pay"
                                : "You Receive"}
                            </Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={enterAmount}
                                onChange={(e) => setEnterAmount(e.target.value)}
                              />
                              <span className="input-group-text">
                                <FaRupeeSign />
                              </span>
                            </div>
                          </Form.Group>
                          {/* Conversion Arrow */}
                          <div className="text-center text-muted mb-3">⇅</div>
                          {/* You Will Receive (Input Group with USDT) */}
                          <Form.Group className="mb-3">
                            <Form.Label>
                              {selectedAction === "buy"
                                ? "You Will Receive Roughly"
                                : "You Pay"}
                            </Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={usdtCurrency}
                                readOnly
                              />
                              <span className="input-group-text">
                                <SiTether />
                              </span>
                            </div>
                          </Form.Group>
                          <br />
                          <ToggleButtonGroup
                            type="radio"
                            name="options"
                            value={selectedMethod}
                            onChange={setSelectedMethod}
                            style={{ gap: "10px" }}>
                            <ToggleButton
                              id="toggle-upi"
                              value={1}
                              className={`custom-toggle-button ${
                                selectedMethod === 1 ? "active" : ""
                              }`}>
                              UPI
                            </ToggleButton>
                            <ToggleButton
                              id="toggle-bank"
                              value={2}
                              className={`custom-toggle-button ${
                                selectedMethod === 2 ? "active" : ""
                              }`}>
                              Bank Account
                            </ToggleButton>
                          </ToggleButtonGroup>
                          <br /> <br />
                          {/* *************wallets******************************************************* */}
                          {/* <Form.Group className="mb-3">
                    <Form.Label>
                      Where should we transfer your Tether?
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Select tether wallet"
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tether Wallet Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter tether wallet address"
                    />
                  </Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="I verify that this wallet address belongs to me."
                    className="mb-3"
                  /> */}
                        </Form>
                      </>
                    ) : (
                      <>
                        <Form>
                          <br />
                          <br />
                          <p className="rate-text">
                            1 USDT is Roughly{" "}
                            <strong>{exchangeRate} INR</strong>
                          </p>
                          <Form.Group>
                            <Form.Label>You Sell</Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type="number"
                                value={enterAmount}
                                onChange={(e) =>
                                  setEnterAmount(e.target.value)
                                }
                              />
                              <span className="input-group-text">
                                <SiTether />
                              </span>
                            </div>
                          </Form.Group>
                          <div className="text-center text-muted mb-3">⇅</div>
                          <Form.Group className="mb-3">
                            <Form.Label>You Will Receive</Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type="number"
                                value={indiacurrency}
                                readOnly
                              />
                              <span className="input-group-text">
                                <FaRupeeSign />
                              </span>
                            </div>
                          </Form.Group>
                          {/* payment method */}
                          <ToggleButtonGroup
                            type="radio"
                            name="options"
                            value={selectedMethod}
                            onChange={setSelectedMethod}
                            style={{ gap: "10px" }}>
                            <ToggleButton
                              id="toggle-upi"
                              value={1}
                              className={`custom-toggle-button ${
                                selectedMethod === 1 ? "active" : ""
                              }`}>
                              UPI
                            </ToggleButton>
                            <ToggleButton
                              id="toggle-bank"
                              value={2}
                              className={`custom-toggle-button ${
                                selectedMethod === 2 ? "active" : ""
                              }`}>
                              Bank Account
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Form>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card>
                  <Card.Body>
                    <h5 className="mb-3">Exchange Information</h5>
                    <div className="box">
                      <div className="d-flex justify-content-between">
                        {/* <p><strong>{selectedAction === "buy" ? "Buying" : "Selling"} {recivingAmount} USDT</strong></p> */}
                        <p
                          style={{
                            color: selectedAction === "buy" ? "green" : "red",
                          }}>
                          <strong>
                            <img
                              src={
                                selectedAction === "buy"
                                  ? "https://noriapay.com/images/icons/oval_buy.png"
                                  : "https://noriapay.com/images/icons/oval_sell.png"
                              }
                              style={{ width: "20px", marginRight: "5px" }}
                            />
                            {selectedAction === "buy" ? "Buying" : "Selling"}{" "}
                            {enterAmount} USDT
                          </strong>
                        </p>
                        {/* *** */}
                        <p>
                          🕐 Processing Time: <strong>30 min - 1hr</strong>
                        </p>
                      </div>
                    </div>
                    <div className="box">
                      <div className="d-flex justify-content-between">
                        <strong>Amount:</strong>
                        <p>{enterAmount} INR</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <strong>Network Fee:</strong>
                        {/* <p>{netWorkFeeINR} USDT</p> */}
                        <p>{selectedAction === "buy" ? netWorkFeeINR : netWorkFeeUSD}</p>
                      </div>
                    </div>
                    <Form.Group>
                      <InputGroup className="mt-2">
                        <Form.Control
                          type="text"
                          placeholder="Enter Coupon Code"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                        <Button variant="outline-primary">Apply</Button>
                      </InputGroup>
                    </Form.Group>
                    <div className="box d-flex justify-content-between orange-bg">
                      <h5>Total Payable:</h5>
                      {/* <h5> {selectedAction === "buy" ? enterAmount + netWorkFeeINR  : enterAmount + netWorkFeeUSD } <p> {selectedAction === "buy" ? "INR" : "USD" }</p></h5> */}
                      <h5 className="d-flex align-items-center">
                        {+enterAmount +
                          +(selectedAction === "buy"
                            ? netWorkFeeINR
                            : netWorkFeeUSD)}
                        <span className="ms-1">
                          {selectedAction === "buy" ? "INR" : "USD"}
                        </span>
                      </h5>
                    </div>
                    <div className="d-flex flex-row-reverse">
                      <Button className="mt-2 rounded-pill btn-grad">
                        Confirm
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default BuySell;
