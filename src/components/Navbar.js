import React from "react";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { FaUser, FaPowerOff } from "react-icons/fa";
import { NavLink } from "react-router-dom";  // Use NavLink instead of Link
import "./pay.css"; 
import richesseImage from '../images/richesse.jpg';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img src={richesseImage} alt="Logo" className="logo" />
          <strong> Richesse Solutions </strong>
        </Navbar.Brand>

        {/* Navbar Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-3">
            <Nav.Link as={NavLink} to="/dashboard" className="nav-item">
              <strong>Dashboard</strong>
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/transaction" className="nav-item">
              <strong>Transactions</strong>
            </Nav.Link>
          </Nav>

          {/* User Profile Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="user-profile-btn">
              <FaUser className="me-2" /> SAI CHARAN SAMPATHIRAO
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item href="/profile">
                <FaUser className="me-2" /> User Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/logout" className="text-danger">
                <FaPowerOff className="me-2" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
