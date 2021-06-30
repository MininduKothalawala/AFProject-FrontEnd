import React, {Component} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import AuthenticationService from './AuthenticationService';
import AthenticationDataService from './AuthenticationDataService';
import {withRouter} from 'react-router-dom';
import Swal from "sweetalert2";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    loginClicked() {
        if (this.state.username === '' || this.state.password === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Fileds cannot be empty',
                background: '#041c3d',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        } else {
            AthenticationDataService.getUser(this.state.username)
                .then(
                    response => {
                        console.log(response.data)
                        if (response.data != null) {
                            if (this.state.password === response.data.password) {
                                AuthenticationService.successfulLogin(response.data.username, response.data.name, response.data.role)
                                this.props.history.push("/admin")
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Wrong username or password',
                                    background: '#041c3d',
                                    iconColor: '#e00404',
                                    confirmButtonColor: '#3aa2e7'
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Wrong username or password',
                                background: '#041c3d',
                                iconColor: '#e00404',
                                confirmButtonColor: '#3aa2e7'
                            })
                        }
                    }
                )
        }

    }

    render() {
        return (
            <Card style={{border: 'none'}}>
                <Card.Body>
                    <Form>
                        <div className={"mb-3"}>
                            <label htmlFor="userId" className="grey-text">
                                User ID
                            </label>
                            <input type="text" name="username" className="form-control" placeholder={"ex: John Mayer"}
                                   value={this.state.username} required onChange={this.handleChange}/>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor="password" className="grey-text">
                                Password
                            </label>
                            <input type="password" name="password" className="form-control" placeholder="Password"
                                   value={this.state.password} required onChange={this.handleChange}/>
                        </div>

                        <div className={"mb-3 mt-4"}>
                            <Button variant={"primary"} name={"signup"} block onClick={this.loginClicked}
                                    style={{fontSize: 20, borderRadius: '0'}} className={"py-3"}>Login</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(Login);
