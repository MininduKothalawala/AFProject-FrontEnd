import React, {Component} from "react";
import {withRouter} from "react-router";
import './AdminNav.css';
import {Accordion, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class AdminNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            index: 0,
            classes: ''
        }
    }


    render() {

        return (
            <Container fluid className={"p-0"}>
                <Row className={"p-0 m-0"}>
                    <Col md={3} className={"p-0"}>
                        <div className={"dashboard-outer-div"}>
                            <div className={"dashboard-logo dashboard-items"}>
                                <h3>ICAF</h3>
                            </div>

                            <div>
                                <div className={"dashboard-items"}>
                                    <div>
                                        <Link to="#" className={"dashboard-links dashboard-single-links"}>Dashboard</Link>
                                    </div>
                                </div>
                                <Accordion>
                                    <Accordion.Toggle as={"div"} variant="link" eventKey="0" className={"dashboard-items"}>
                                        User
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0" className={"dashboard-collapse"}>
                                        <div>
                                            <Link to="#" className={"dashboard-links"}>Add User</Link>
                                            <Link to="#" className={"dashboard-links"}>Edit User</Link>
                                            <Link to="#" className={"dashboard-links"}>User List</Link>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion>
                                    <Accordion.Toggle as={"div"} variant="link" eventKey="1" className={"dashboard-items"}>
                                        Templates
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1" className={"dashboard-collapse"}>
                                        <div>
                                            <Link to="/admin-template/add" className={"dashboard-links"}>Add Template</Link> <br/>
                                            <Link to="/admin-template/research" className={"dashboard-links"}>Research Template</Link> <br/>
                                            <Link to="/admin-template/powerpoint" className={"dashboard-links"}>Powerpoint Template</Link> <br/>
                                            <Link to="/admin-template/other" className={"dashboard-links"}>Other Template</Link>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <Accordion>
                                    <Accordion.Toggle as={"div"} variant="link" eventKey="2" className={"dashboard-items"}>
                                        Conference
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="2" className={"dashboard-collapse"}>
                                        <div>
                                            <Link to="#" className={"dashboard-links"}>Add Conference</Link> <br/>
                                            <Link to="#" className={"dashboard-links"}>Edit Conference</Link> <br/>
                                            <Link to="#" className={"dashboard-links"}>Conference List</Link>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>


                                <Accordion>
                                    <Accordion.Toggle as={"div"} variant="link" eventKey="3" className={"dashboard-items"}>
                                        Reviews
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3" className={"dashboard-collapse"}>
                                        <div>
                                            <Link to="#" className={"dashboard-links"}>Research Papers</Link> <br/>
                                            <Link to="#" className={"dashboard-links"}>Workshop Proposals</Link>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <div className={"dashboard-items"}>
                                    <Link to="#" className={"dashboard-links dashboard-single-links"}>Logout</Link>
                                </div>

                                <div className={"dashboard-footer"}>
                                    <div>@ICAF 2021</div>
                                </div>
                            </div>

                        </div>
                    </Col>

                    <Col style={{backgroundColor:'#854545'}} className={"p-0"}>

                        {/* -------------------Content comes here-------------------*/}
                    </Col>
                </Row>
            </Container>

        )
    }

}

export default withRouter(AdminNav);