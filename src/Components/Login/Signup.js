import React, {Component} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import UserService from "./UserService";
import * as Swal from "sweetalert2";
import {withRouter} from "react-router";



class SignUp extends Component {

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
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>User has been added!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })

                })
                .catch(err => {
                    console.log(err.data)
                })

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                html: '<p>Please select a Role!</p>',
                background: '#041c3d',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        }


    }
    render() {
        return (
            <div>
                <Card style={{border: 'none'}}>
                    <Card.Body className={"p-0"}>
                        <form onSubmit={this.handleSubmit}>
                            <div className={"mb-3"}>
                                <label htmlFor="name" className="grey-text">
                                    Full Name
                                </label>
                                <input type="text" id="name" name="name" className="form-control"
                                       placeholder={"ex: John Mayer"}
                                       required={true} onChange={this.handleChange}/>
                            </div>

                            <div className={"mb-3"}>
                                <label htmlFor="email" className="grey-text">
                                    Email Address
                                </label>
                                <input type="email" id="email" name="email" className="form-control"
                                       placeholder={"ex: john@mail.com"}
                                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                       required={true} onChange={this.handleChange}
                                />
                            </div>

                            <div className={"mb-3"}>
                                <label htmlFor="username" className="grey-text">
                                    Username
                                </label>
                                <input type="text" id="username" name="username" className="form-control"
                                       placeholder={"ex: JohnMayer27"}
                                       required={true} onChange={this.handleChange}
                                />
                            </div>

                            <div className={"mb-3"}>
                                <label htmlFor="password" className="grey-text">
                                    Password
                                </label>
                                <input type="password" id="password" name="password" className="form-control"
                                       placeholder={"Use a strong password"}
                                       required={true} onChange={this.handleChange}
                                />
                            </div>

                            <Row className={"mb-3"}>
                                <Col md={6}>
                                    <label htmlFor="mobile_no" className="grey-text">
                                        Mobile No
                                    </label>
                                    <input type="text" id="mobile_no" name="mobile_no" className="form-control"
                                           placeholder={"ex: 07xxxxxxxx"}
                                           maxLength={10} pattern="[0-9]{10}"
                                           onChange={this.handleChange} required={true}/>
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="role" className="grey-text">
                                        Select a Role
                                    </label>
                                    <select className="form-control" id="role" name={"role"} value={this.state.role}
                                            required={true} onChange={this.handleChange}>
                                        <option value={"role"}>Select role</option>
                                        <option value={"admin"}>Admin</option>
                                        <option value={"editor"}>Editor</option>
                                        <option value={"reviewer"}>Reviewer</option>
                                    </select>
                                </Col>
                            </Row>

                            <div className={"mb-3 mt-4"}>
                                <Button variant={"dark"} type={"submit"} name={"signup"} block style={{
                                    fontSize: 20,
                                    borderRadius: '0'
                                }} className={"py-3"} >Add User</Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>

            </div>

        );
    }


}


export default withRouter (SignUp);