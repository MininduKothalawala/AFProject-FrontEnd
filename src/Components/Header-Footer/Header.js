import React, {Component} from "react";
import {withRouter} from "react-router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import {Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from "../Login/AuthenticationService";
import Login from "../Login/Login";

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
                <div>

                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">SLIIT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <NavDropdown title="Templates" id="basic-nav-dropdown">
                                    <Link className="dropdown-item" to="/templates/research">Research Paper Templates</Link>
                                    <NavDropdown.Divider />
                                    <Link className="dropdown-item" to="/templates/proposal">Workshop Proposal Templates</Link>
                                    <NavDropdown.Divider />
                                    <Link className="dropdown-item" to="/templates/presentation">Presentation Templates</Link>
                                </NavDropdown>

                            </Nav>

                            {
                                !isUserLoggedIn &&
                                <button style={{backgroundColor: 'transparent', border: 'none'}}
                                    onClick={this.handleShow}><FontAwesomeIcon icon={faUser}/>&nbsp; Login</button>
                            }
                            {
                                isUserLoggedIn &&
                                <Link to="/admin" style={{textDecoration: 'none'}}>
                                Dashboard</Link>
                            }

                        </Navbar.Collapse>
                    </Navbar>
                </div>

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