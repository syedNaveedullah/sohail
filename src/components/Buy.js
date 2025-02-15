import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, ToggleButton, ToggleButtonGroup, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRupeeSign } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import "./pay.css";
import CustomNavbar from "./Navbar";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/paymentApis";


const loadScript = async (src) => {
  return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
};
const BuySell = () => {
  const [selectedAction, setSelectedAction] = useState("buy");
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [enterAmount, setEnterAmount] = useState();
  const [coupon, setCoupon] = useState("");
  const [netWorkFeeINR, setNetWorkFeeINR] = useState(2.0);
  const [netWorkFeeUSD, setNetWorkFeeUSD] = useState(1.6);
  const mutate=useMutation({
    mutationFn:createOrder,
    mutationKey:["createOrder"]

  })
  const exchangeRate = selectedAction === "buy" ? 94.06 : 89.38;
  const usdtCurrency=enterAmount/exchangeRate;
  const indiacurrency = exchangeRate * enterAmount;
  const [formData, setFormData] = useState({
    transactionType: "",
    paymentMethod: "",
    amountSent: "",
    currencySent: "",
    amountRecieve: "",
    currencyRecieve: "",
    fee: "",
    totalAmount: "",
    // payment_proof: "",

  })
  // const [wallet, setWallet] = useState("");
  const handleChange=(e)=>{ 
    setFormData({...formData,[e.target.name]:e.target.value
  })}
  async function displayRazorpay(data) {
    console.log(data)
		const res =await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		// const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
		// 	t.json()
		// )

		console.log(data)

		const options = {
			key: 'rzp_test_cOor9xEA574q6G',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Richesse Currency Exchange',
			description: 'Thank you for nothing. Please give us some money',
			image: 'http://localhost:1337/logo.svg',
			handler: function (response) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
			},
			// prefill: {
			// 	name:
			// 	email: 'sdfdsjfh2@ndsfdf.com',
			// 	phone_number: '9899999999'
			// }
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
  const handleSubmit=(e)=>{
    e.preventDefault();
    formData.transactionType=selectedAction;
    if(selectedMethod===1){
      formData.paymentMethod="UPI";
    }else{
      formData.paymentMethod="Bank Account";
    }
    formData.amountSent=enterAmount;
    if(selectedAction==="buy"){
      formData.currencySent="INR";
      formData.currencyRecieve="USDT";
      formData.amountRecieve=enterAmount/94.06;
    }else{
      formData.currencySent="USDT";
      formData.currencyRecieve="INR";
      formData.amountRecieve=enterAmount*94.06;
    }
    formData.fee=selectedAction==="buy"?2.0:1.6;
    formData.totalAmount=+enterAmount + +formData.fee;
   
    console.log(formData);
    mutate.mutateAsync(formData).then((data)=>{
      
      console.log(data.data)
      displayRazorpay(data.data.razorpayOrder)
    } ).catch((error)=>{
      console.log(error);
    })
  }


  return (
    <>
      <CustomNavbar />
      <div className="transactions-history">
        <div className="transactions-header" >
          <h2>Checkout</h2>
        </div>
        <div className="buy-section">
          <Container className="mt-5" style={{ transform: "translateY(-30%)"}}>
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
                            <Form.Label>You Pay</Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type="number"
                                 placeholder="Enter amount"
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
                         <br/>
                          <div className="text-center text-muted mb-3">⇅</div>

                          <Form.Group className="mb-3">
                            <Form.Label>You Will Receive Roughly</Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type="number"
                                 placeholder="Enter amount"
                                value={indiacurrency}
                                readOnly
                              />
                              <span className="input-group-text">
                                <FaRupeeSign />
                              </span>
                            </div>
                          </Form.Group>
                          <br/>
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
                          <br /> <br />
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
                    <br/>
                    <Form.Group>
                      <InputGroup className="mt-2">
                        <Form.Control
                          type="text"
                          placeholder="Enter Coupon Code"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                        <Button variant="outline-primary" className="hoverr" style={{color:'#d4af37', borderColor:'#d4af37'}}>Apply</Button>
                      </InputGroup>
                    </Form.Group>
                    <br/>

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
                    <br/>
                    
                    <div className="d-flex flex-row-reverse">  
                      <Button className="mt-2 rounded-pill btn-grad" onClick={handleSubmit}>
                        Confirm
                      </Button>
                    </div>

                    <br/>  
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
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
};

export default BuySell;
