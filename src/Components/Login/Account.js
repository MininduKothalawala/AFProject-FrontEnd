import React, {Component} from "react";
import {Card, Container, Nav, Tab} from "react-bootstrap";
import './Login.css'
import Login from "./Login";
import SignUp from "./Signup";


class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <Container className={"my-5 py-4"} style={{width: '36.9rem'}}>

                <Card className={"accountCard"}>

                    <Tab.Container defaultActiveKey="Signup">
                        <div>
                            <Nav justify variant="tabs" className="justify-content-center mx-0 " as={"ul"}  >
                                <Nav.Item as={"li"} >
                                    <Nav.Link eventKey="Signup" className={"btnAccount"} style={{borderRadius:'0'}}>Sign Up</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as={"li"}>
                                    <Nav.Link eventKey="Login" className={"btnAccount"} style={{borderRadius:'0'}}>Log In</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>

                        <div className={"mt-5"}>
                            <Tab.Content>

                                {/*----------------------------------- SignUp -----------------------------------*/}
                                <Tab.Pane eventKey="Signup">
                                    <SignUp />
                                </Tab.Pane>

                                {/*----------------------------------- Login -----------------------------------*/}
                                <Tab.Pane eventKey="Login">
                                    <Login />
                                </Tab.Pane>

                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </Card>

            </Container>
        );

    }

}


export default MyAccount;