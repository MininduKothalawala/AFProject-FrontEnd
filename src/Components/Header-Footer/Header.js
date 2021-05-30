import React, {Component} from "react";
import {Nav, Navbar} from "react-bootstrap";
import { withRouter } from "react-router";
import AuthenticationService from "../Authentication/AuthenticationService";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
    state={}

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();
        const loggedUser = AuthenticationService.loggedUserName();
        let loggedAsAdmin = false;
        let loggedAsReviever = false;
        let loggedAsEditor = false;

        if (loggedUserRole != null && loggedUserRole === 'admin') {
            loggedAsAdmin = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'reviever') {
            loggedAsReviever = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'editor') {
            loggedAsEditor = true;
        }

        return(
            <div className={"mb-5"}>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">ICAF</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#templates">Templates</Nav.Link>
                            <Nav.Link href="/conference/reg">RegToConference</Nav.Link>
                            <Nav.Link href="/conferenceList">ConferenceList</Nav.Link>
                            <Nav.Link href="/addConference">AddConference</Nav.Link>
                            <Nav.Link href="/listAllConference">All Conferences</Nav.Link>
                            <Nav.Link href="/listPendingConference">Pending Conferences</Nav.Link>
                            <Nav.Link href="/listApprovedConference">Approved Conferences</Nav.Link>
                        </Nav>

                        {!loggedUser &&
                            <Link to="/Login" onClick={AuthenticationService.logout} style={{textDecoration:'none'}}>
                                <FontAwesomeIcon icon={faUser}/>Login</Link>
                        }

                        {loggedUser &&
                            <>
                                <div className={"mr-3"}><FontAwesomeIcon icon={faUser} className={"mr-2"}/>Hi, {loggedUser}</div>
                                <Link to="/Login" onClick={AuthenticationService.logout} style={{textDecoration:'none'}}>
                                    <FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
                            </>
                        }
                    </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }

}
export default withRouter(Header);