import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import ConferenceRegDataService from "./ConferenceRegDataService";
import {withRouter} from "react-router-dom";

class RegAttendee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conferenceId: props.id,
            name: '',
            email: '',
            mobile: '',
        }
    }

    componentDidMount() {

    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFileChange = (event) => {
        event.preventDefault();

        this.setState({
            file: event.target.files,
            filename: event.target.files[0].name
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();



        let data = {
            a_conferenceId: this.state.conferenceId,
            a_name: this.state.name,
            a_email: this.state.email,
            a_mobileNo: this.state.mobile,
            a_payment_status: "pending"
        }

        ConferenceRegDataService.regAsAttendee(data)
            .then(res => {
                console.log(data);
                console.log(res);

                if (res.status === 201) {
                    console.log("CREATED");

                    Swal.fire({
                        icon: 'success',
                        title: 'SUCCESS',
                        html: '<p>Your have successfully registered!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        iconColor: '#58b7ff',
                        timer: 1500
                    });

                    this.props.history.push("/");
                }
            })
    }

    render() {
        const {name, email, mobile} = this.state;
        return (
            <Card>
                <Card.Header>Register</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId={"regName"}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type={"text"} name={"name"} placeholder={"Enter name"} required
                                          value={name} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId={"regEmail"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type={"email"} name={"email"} placeholder={"Enter email"}
                                          required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                          value={email} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId={"regMobile"}>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type={"text"} name={"mobile"} placeholder={"Enter mobile number"}
                                          required maxLength={10} pattern="[0-9]{10}"
                                          value={mobile} onChange={this.handleChange}/>
                        </Form.Group>

                        <hr className={"my-5"}/>
                        <div>
                            <h3>Payments</h3>
                        </div>

                        <div className={"my-4"}>
                            <Button variant="primary" className={"mr-3"} type={"submit"}>Submit</Button>
                        </div>


                    </Form>
                </Card.Body>
            </Card>
        )
    }

}

export default withRouter(RegAttendee);