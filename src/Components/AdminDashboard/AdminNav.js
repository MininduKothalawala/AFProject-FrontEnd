import React, {Component} from "react";
import {withRouter} from "react-router";
import './AdminNav.css';
import {Container, ListGroup, Modal, Navbar, NavDropdown, Tab} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthenticationService from "../Login/AuthenticationService";
import {
    faBars,
    faChalkboardTeacher, faDollarSign, faFileAlt, faFileContract, faFileSignature, faHome, faPlusSquare,
    faSignOutAlt,
    faThLarge,
    faTimes,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SignUp from "../Login/Signup";
import GettAllUsers from "./User/GettAllUsers";
import AddTemplates from "./Templates/AddTemplates";
import AddConferenceDetailsComponent from "../Editor/Add-ConferenceDetails.Component";
import ListAllConferenceDetailsComponent from "./Conference/List-AllConferenceDetails.Component";
import TemplateList from "./Templates/TemplateList";
import Dashboard from "./Dashboard";
import ProposalReview from "./Review/ProposalReview";
import ResearchPaperReview from "./Review/ResearchPaperReview";
import Payment from "./Payment/Payment";
import AdminProfile from "./User/AdminProfile";
import ListApprovedConferenceDetailsComponent from "./Conference/List-ApprovedConferenceDetails.Component";
import ListPendingConferenceDetails from "./Conference/List-PendingConferenceDetails.Component";

class AdminNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            index: 0,
            classes: '',
            show: true,
            loading: "Templates",
            windowWidth: window.innerWidth, //window size
            width: "0",
            mleft: "0",
            modalBox: false
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
        this.setState({windowWidth: window.innerWidth})

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
        this.props.history.push("/")
    }

    //go to home
    mainUi = () => {
        this.props.history.push("/")
    }

    //Modal box
    handleShow = () => {
        this.setState({modalBox: true})
    }
    //Modal box
    handleClose = () => {
        this.setState({modalBox: false})
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
                                    {/*-------------------------------Dashboard-------------------------------*/}
                                    <ListGroup.Item eventKey="dashboard" onClick={() => this.loadContent("Dashboard")}>
                                        <FontAwesomeIcon className={"mr-3"} icon={faThLarge}/>
                                        Dashboard
                                    </ListGroup.Item>

                                    <div>
                                        <hr style={{borderTop: '1px solid rgba(255,255,255,0.3)', margin:0}}/>
                                    </div>

                                    {/*-------------------------------Users-------------------------------*/}
                                    {loggedAsAdmin &&
                                        <>
                                            <ListGroup.Item eventKey="user" onClick={() => this.loadContent("Users")}>
                                                <FontAwesomeIcon className={"mr-3"} icon={faUser}/>
                                                User
                                            </ListGroup.Item>
                                            <div>
                                                <hr style={{borderTop: '1px solid rgba(255,255,255,0.3)', margin:0}}/>
                                            </div>
                                        </>
                                    }

                                    {/*-------------------------------Conference-------------------------------*/}
                                    <>
                                        <ListGroup.Item eventKey="conference"
                                                        onClick={() => this.loadContent("Conference")}>
                                            <FontAwesomeIcon className={"mr-3"} icon={faChalkboardTeacher}/>
                                            Conference
                                        </ListGroup.Item>

                                        { loggedAsEditor &&
                                        <ListGroup.Item eventKey="add-conference"
                                                        onClick={() => this.loadContent("Add Conference")}>
                                            <FontAwesomeIcon className={"mr-3"} icon={faPlusSquare}/>
                                            Add Conference
                                        </ListGroup.Item>
                                        }

                                        <div>
                                            <hr style={{borderTop: '1px solid rgba(255,255,255,0.3)', margin:0}}/>
                                        </div>
                                    </>

                                    {/*-------------------------------Templates-------------------------------*/}
                                    { loggedAsEditor &&
                                    <>
                                        { (loggedAsEditor || loggedAsAdmin) &&
                                            <ListGroup.Item eventKey="template" onClick={() => this.loadContent("Templates")}>
                                                <FontAwesomeIcon className={"mr-3"} icon={faFileContract}/>
                                                Templates
                                            </ListGroup.Item>
                                        }
                                        <ListGroup.Item eventKey="addtemplate" onClick={() => this.loadContent("Add Templates")}>
                                            <FontAwesomeIcon className={"mr-3"} icon={faPlusSquare}/>
                                            Add Templates
                                        </ListGroup.Item>
                                        <div>
                                            <hr style={{borderTop: '1px solid rgba(255,255,255,0.3)', margin:0}}/>
                                        </div>
                                    </>
                                    }

                                    {/*-------------------------------Review-------------------------------*/}
                                    { loggedAsReviewer &&
                                    <>
                                        <ListGroup.Item eventKey="papers"
                                                        onClick={() => this.loadContent("Research Paper Review")}>
                                            <FontAwesomeIcon className={"mr-3"} icon={faFileSignature}/>
                                            Review Research Papers
                                        </ListGroup.Item>
                                        <ListGroup.Item eventKey="proposals"
                                                        onClick={() => this.loadContent("Workshop Proposal Review")}>
                                            <FontAwesomeIcon className={"mr-3"} icon={faFileAlt}/>
                                            Review Workshop Proposals
                                        </ListGroup.Item>
                                        <div>
                                            <hr style={{borderTop: '1px solid rgba(255,255,255,0.3)', margin:0}}/>
                                        </div>
                                    </>
                                    }

                                    { loggedAsAdmin &&
                                        <ListGroup.Item eventKey="proposals" onClick={() => this.loadContent("Payment")}>
                                            <FontAwesomeIcon className={"mr-3"} icon={faDollarSign}/>
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
                                        <button className={"menu-icon"} onClick={this.mainUi}>
                                            <h6><FontAwesomeIcon icon={faHome}/></h6>
                                        </button>
                                    </Navbar.Text>
                                    <NavDropdown as={"h6"} title={`Hi, ${loggedUser}`} id="basic-nav-dropdown"
                                                 className={"menu-icon"}>
                                        <NavDropdown.Item as={"h6"} onClick={this.handleShow}>User
                                            Profile</NavDropdown.Item>

                                        {/*-------------------User Profile-------------------*/}
                                        <Modal show={this.state.modalBox} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>User Profile</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body> <AdminProfile/> </Modal.Body>
                                        </Modal>
                                    </NavDropdown>
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

                            {this.state.loading === "Dashboard" && <Dashboard/>}

                            {this.state.loading === "Users" &&
                            <div className={"grid-container-row"}>
                                <div className={"dashboard-content"}>
                                    <h5>Add User</h5> <br/>
                                    <SignUp/>
                                </div>
                                <div className={"dashboard-content"}>
                                    <h5>List of Users</h5> <br/>
                                    <GettAllUsers/>
                                </div>
                            </div>
                            }

                            { this.state.loading === "Conference" &&
                            <div className={"grid-container-row"}>

                                { loggedAsAdmin &&
                                    <div className={"dashboard-content"}>
                                        <h5>List of Pending Conference</h5> <br/>
                                        <ListPendingConferenceDetails/>
                                    </div>
                                }

                                { loggedAsReviewer &&

                                    <div className={"dashboard-content"}>
                                        <h5>List of Approved Conference</h5> <br/>
                                        <ListApprovedConferenceDetailsComponent/>
                                    </div>
                                }

                                { (loggedAsAdmin || loggedAsEditor) &&
                                    <div className={"dashboard-content"}>
                                        <h5>List of All Conference</h5> <br/>
                                        <ListAllConferenceDetailsComponent/>
                                    </div>
                                }
                            </div>
                            }

                            { this.state.loading === "Add Conference" &&
                                <Container>
                                    <div className={"dashboard-content"}>
                                        <h5>Add Conference</h5> <br/>
                                        <AddConferenceDetailsComponent/>
                                    </div>
                                </Container>
                            }

                            { this.state.loading === "Templates" &&
                                <>
                                    { (loggedAsEditor || loggedAsAdmin) &&
                                        <div className={"dashboard-content"}>
                                            <h5>List of Template</h5> <br/>
                                            <TemplateList/>
                                        </div>
                                    }
                                </>
                            }

                            { this.state.loading === "Add Templates" &&
                                <Container className={"dashboard-content"}>
                                    <h5>Add Template</h5> <br/>
                                    <AddTemplates/>
                                </Container>
                            }

                            {this.state.loading === "Research Paper Review" && <ResearchPaperReview/>}
                            {this.state.loading === "Workshop Proposal Review" && <ProposalReview/>}
                            {this.state.loading === "Payment" && <Payment/>}

                        </div>
                    </div>
                </div>
                }
            </div>

        )
    }

}

export default withRouter(AdminNav);