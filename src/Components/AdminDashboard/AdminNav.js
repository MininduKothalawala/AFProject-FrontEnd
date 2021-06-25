import React, {Component} from "react";
import {withRouter} from "react-router";
import './AdminNav.css';
import {ListGroup, Navbar, Tab} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthenticationService from "../Authentication/AuthenticationService";
import {
    faBars, faBell,
    faChalkboardTeacher, faDollarSign, faFileAlt, faFileContract, faFileSignature,
    faSignOutAlt,
    faThLarge,
    faTimes,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SignUp from "../Login/Signup";
import GettAllUsers from "./GettAllUsers";
import AddTemplates from "./Templates/AddTemplates";
import AddConferenceDetailsComponent from "../Editor/Add-ConferenceDetails.Component";
import ListAllConferenceDetailsComponent from "../Admin/List-AllConferenceDetails.Component";
import TemplateList from "./Templates/TemplateList";
import Dashboard from "./Dashboard";
import ProposalReview from "./Review/ProposalReview";
import ResearchPaperReview from "./Review/ResearchPaperReview";
import Payment from "./Payment/Payment";

class AdminNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            index: 0,
            classes: '',
            show: true,
            loading: "Dashboard",
            windowWidth: window.innerWidth, //window size
            width: "0",
            mleft: "0"
        }
    }

    componentDidMount() {
        // console.log("s:" + this.state.windowWidth)

        if (this.state.windowWidth > 992) {
            this.setState({width: "300px", mleft: "300px"})
        } else if (this.state.windowWidth < 992) {
            this.setState({width: "0", mleft: "0"})
        }

        window.addEventListener("resize", this.windowResize);
    }

    windowResize = () => {
        // window size for responsive design
        this.setState({windowWidth: window.innerWidth})
        // console.log("r:" + this.state.windowWidth)
        // console.log("w:" + this.state.width)

        // this.updateSize();

        let size = this.state.windowWidth;

        if (size < 992) {
            console.log("s:" + this.state.width)
            this.setState({width: "0", mleft: "0"})

        } else if (size >= 992) {
            console.log("l:" + this.state.width)
            this.setState({width: "300px", mleft: "300px"})
        }
    }

    openSideNav = (e) => {
        // e.preventDefault();

        let size = this.state.windowWidth;
        let width = this.state.width;

        if (size < 768) {
            if (width === "0")
                this.setState({width: "100%", mleft: "0"})
            else if (width === "100%")
                this.setState({width: "0", mleft: "0"})
        } else if (size >= 768) {
            if (width !== "300px")
                this.setState({width: "300px", mleft: "300px"})
            else
                this.setState({width: "0", mleft: "0"})
        }

    }

    closeSideNav = (e) => {
        e.preventDefault();

        this.setState({
            width: "0", mleft: "0"
        })
    }

    loadContent = (text) => {
        this.setState({loading: text})
    }

    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/login")
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();
        const loggedUser = AuthenticationService.loggedUserName();
        let loggedAsAdmin = false;
        let loggedAsReviewer = false;
        let loggedAsEditor = false;

        if (loggedUserRole != null && loggedUserRole === 'admin') {
            loggedAsAdmin = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'reviewer') {
            loggedAsReviewer = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'editor') {
            loggedAsEditor = true;
        }

        return (
            <div>
                {isUserLoggedIn &&
                <div>
                    {/*-------------------Side NavBar-------------------*/}
                    <div className={"dashboard-outer-div"} style={{width: this.state.width}}>
                        <div className={"text-right mr-3 mt-3"}>
                            <button className={"close-icon"} onClick={this.closeSideNav}>
                                <FontAwesomeIcon icon={faTimes}/></button>
                        </div>
                        <div className={"dashboard-logo"}>
                            <h3>SLIIT ICAF </h3>
                        </div>

                        <div>
                            <Tab.Container id="list-group-tabs-example" defaultActiveKey="dashboard">
                                <ListGroup>
                                    <ListGroup.Item eventKey="dashboard" onClick={() => this.loadContent("Dashboard")}>
                                        <FontAwesomeIcon className={"mr-2"} icon={faThLarge}/>
                                        Dashboard
                                    </ListGroup.Item>
                                    <ListGroup.Item eventKey="user" onClick={() => this.loadContent("Users")}>
                                        <FontAwesomeIcon className={"mr-2"} icon={faUser}/>
                                        User
                                    </ListGroup.Item>
                                    <ListGroup.Item eventKey="template" onClick={() => this.loadContent("Templates")}>
                                        <FontAwesomeIcon className={"mr-2"} icon={faFileContract}/>
                                        Templates
                                    </ListGroup.Item>
                                    <ListGroup.Item eventKey="conference"
                                                    onClick={() => this.loadContent("conference")}>
                                        <FontAwesomeIcon className={"mr-2"} icon={faChalkboardTeacher}/>
                                        Conference
                                    </ListGroup.Item>

                                    { loggedAsReviewer &&
                                        <>
                                            <ListGroup.Item eventKey="papers" onClick={() => this.loadContent("Research Paper Review")}>
                                                <FontAwesomeIcon className={"mr-2"} icon={faFileSignature}/>
                                                Review Research Papers
                                            </ListGroup.Item>
                                            <ListGroup.Item eventKey="proposals" onClick={() => this.loadContent("Workshop Proposal Review")}>
                                                <FontAwesomeIcon className={"mr-2"} icon={faFileAlt}/>
                                                Review Workshop Proposals
                                            </ListGroup.Item>
                                        </>
                                    }

                                    { loggedAsAdmin &&
                                        <ListGroup.Item eventKey="proposals" onClick={() => this.loadContent("Payment")}>
                                            <FontAwesomeIcon className={"mr-2"} icon={faDollarSign}/>
                                            Payments
                                        </ListGroup.Item>
                                    }
                                </ListGroup>
                            </Tab.Container>
                        </div>

                    </div>


                    <div className={"grid-nav"} style={{marginLeft: this.state.mleft}}>
                        {/*-------------------Horizontal NavBar-------------------*/}
                        <div className={"sub-menu"}>
                            <Navbar>
                                <Navbar.Brand>
                                    {/*Hamburger Icon*/}
                                    <h4 style={{color: '#007bff'}}>
                                        <button className={"menu-icon"} onClick={this.openSideNav}><FontAwesomeIcon
                                            icon={faBars}/></button>
                                        &nbsp; {this.state.loading}
                                    </h4>
                                </Navbar.Brand>
                                <Navbar.Toggle/>
                                <Navbar.Collapse className="justify-content-end">
                                    <Navbar.Text>
                                        <button className={"menu-icon"}>
                                            <h6><FontAwesomeIcon icon={faBell}/></h6>
                                        </button>
                                    </Navbar.Text>
                                    <Navbar.Text>
                                        <h6 className={"menu-icon"}><FontAwesomeIcon icon={faUser}/> &nbsp; Hi, {loggedUser}</h6>
                                    </Navbar.Text>
                                    <Navbar.Text>
                                        <button className={"menu-icon"} onClick={this.logout}>
                                            <h6><FontAwesomeIcon icon={faSignOutAlt}/> Logout</h6>
                                        </button>
                                    </Navbar.Text>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>

                        {/*-------------------Dashboard Content-------------------*/}
                        <div className={"load-components"}>

                            { this.state.loading === "Dashboard" && <Dashboard/> }


                            { this.state.loading === "Users" &&
                                <div className={"grid-container-col"}>
                                    <div className={"dashboard-content"}>
                                        <h5>Add User</h5> <br/>
                                        <SignUp/>
                                    </div>
                                    <div className={"dashboard-content"}>
                                        {/*Todo: Profile comes here*/}
                                        <h5>User Profile</h5> <br/>
                                        <SignUp/>
                                    </div>
                                    <div className={"dashboard-content grid-item1"}>
                                        <h5>List of Users</h5> <br/>
                                        <GettAllUsers/>
                                    </div>
                                </div>
                            }

                            { this.state.loading === "Templates" &&
                                <div className={"grid-container-row"}>
                                    <div className={"dashboard-content"}>
                                        <h5>Add Template</h5> <br/>
                                        <AddTemplates/>
                                    </div>
                                    <div className={"dashboard-content"}>
                                        <h5>List of Template</h5> <br/>
                                        <TemplateList/>
                                    </div>
                                </div>
                            }

                            { this.state.loading === "conference" &&
                                <div className={"grid-container-row"}>

                                    { loggedAsEditor &&
                                    <div className={"dashboard-content"}>
                                        <h5>Add Conference</h5> <br/>
                                        <AddConferenceDetailsComponent/>
                                    </div>
                                    }

                                    <div className={"dashboard-content"}>
                                        <h5>List of Conference</h5> <br/>
                                        <ListAllConferenceDetailsComponent/>
                                    </div>
                                </div>
                            }

                            { this.state.loading === "Research Paper Review" && <ResearchPaperReview /> }
                            { this.state.loading === "Workshop Proposal Review" && <ProposalReview /> }
                            { this.state.loading === "Payment" && <Payment /> }

                        </div>
                    </div>


                </div>
                }


            </div>

        )
    }

}

export default withRouter(AdminNav);