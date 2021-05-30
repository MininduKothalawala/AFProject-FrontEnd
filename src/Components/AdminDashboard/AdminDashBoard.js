import React, {Component} from 'react';
import AuthenticationService from '../Authentication/AuthenticationService';
import {Col, Nav, Row} from "react-bootstrap";
import swal from "sweetalert";
import UserService from "../../API/UserService";
import * as Swal from "sweetalert2";
import SignUp from "../Login/Signup";
import GetAllUsers from "../AdminDashboard/GettAllUsers"
import Tab from 'react-bootstrap/Tab'

// TODO:use as Dashboard

class AdminDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            password: '',
            email: '',
            mobile_no: '',
            role: 'role'
        }

    }

    componentDidMount() {
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.role !== "role") {

            let newuser = {
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                role: this.state.role,
                mobileNo: this.state.mobile_no,
                email: this.state.email
            }

            UserService.createUser(newuser)
                .then(res => {
                    console.log(res.data)

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Happy Shopping!',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        this.props.history.push('/');
                    })
                })
                .catch(err => {
                    console.log(err.data)
                })

        } else {
            swal({
                title: "Please select a Role!",
                icon: "warning",
                buttons: "Ok"
            })
        }


    }


    render() {

        const loggedUserRole = AuthenticationService.loggedUserRole();
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

        return (
            <div>



                <h1>
                    <center>Admin Dashboard</center>
                </h1>
                {loggedAsAdmin &&


                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3} style={{background:''}}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first"> Add User</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second"> All User</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                 <SignUp />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                 <GetAllUsers />
                                </Tab.Pane>





                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

                }
                {loggedAsReviever &&
                <>
                    <h1>login as a reviver</h1>


                </>

                }
                {loggedAsEditor &&
                <>
                    <h1>login as a Editor</h1>


                </>

                }


            </div>


        );
    }

}

export default AdminDashBoard;