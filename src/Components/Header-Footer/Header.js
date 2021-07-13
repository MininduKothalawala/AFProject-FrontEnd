import React, {Component} from "react";
import {withRouter} from "react-router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import {Container, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from "../Login/AuthenticationService";
import Login from "../Login/Login";
import logo from "../../Assets/icaf-logo-white.svg"
import logoName from "../../Assets/ICAF.svg"
import "./Header-Footer.css"

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    //Modal box
    handleShow = () => {
        this.setState({show: true})
    }
    //Modal box
    handleClose = () => {
        this.setState({show: false})
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <div>
                <Navbar expand="lg" className={"icaf-header"} variant={"dark"}>

                    <Container className={"px-0"}>
                        <Navbar.Brand href="/" className={"brand-logo-name"}>
                            <img src={logo} width="75" height="75" alt="ICAF-logo" className={"icaf-nav-img"}/>
                            <img src={logoName} width="75" height="75" alt="ICAF-name" className={"icaf-nav-img"}/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <NavDropdown title="Templates" id="basic-nav-dropdown">
                                    <Link className="dropdown-item" to="/templates/research">Research Paper Templates</Link>
                                    <NavDropdown.Divider/>
                                    <Link className="dropdown-item" to="/templates/proposal">Workshop Proposal Templates</Link>
                                    <NavDropdown.Divider/>
                                    <Link className="dropdown-item" to="/templates/presentation">Presentation Templates</Link>
                                </NavDropdown>
                                <NavDropdown title="Payment" id="basic-nav-dropdown">
                                    <Link className="dropdown-item" to="/payment/researcher">For Researchers</Link>
                                    <NavDropdown.Divider/>
                                    <Link className="dropdown-item" to="/payment/attendee">For Attendee</Link>
                                </NavDropdown>

                            </Nav>

                            {
                                !isUserLoggedIn &&
                                <button style={{backgroundColor: 'transparent', border: 'none', color: '#fff'}}
                                        onClick={this.handleShow}><FontAwesomeIcon icon={faUser}/>&nbsp; Login</button>
                            }
                            {
                                isUserLoggedIn &&
                                <Link to="/admin" style={{textDecoration: 'none', color: '#fff'}}>
                                    Dashboard</Link>
                            }
                        </Navbar.Collapse>
                    </Container>


                </Navbar>

                <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <Login/> </Modal.Body>
                </Modal>

            </div>

        )
    }

}

export default withRouter(Header);