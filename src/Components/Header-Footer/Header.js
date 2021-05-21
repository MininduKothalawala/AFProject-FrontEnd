import React, {Component} from "react";
import {Nav, Navbar} from "react-bootstrap";
import { withRouter } from "react-router";

class Header extends Component {
    state={}

    render() {
        return(
            <div className={"mb-5"}>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">ICAF</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#templates">Templates</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }

}
export default withRouter(Header);