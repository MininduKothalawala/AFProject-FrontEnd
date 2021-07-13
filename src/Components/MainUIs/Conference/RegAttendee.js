import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import ConferenceRegDataService from "./ConferenceRegDataService";
import {withRouter} from "react-router-dom";
import axios from "axios";

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

                    this.notifyUser(this.state.conferenceId,this.state.mobile,this.state.mobile)

                    Swal.fire({
                        icon: 'success',
                        title: 'SUCCESS',
                        html: '<p>Your have successfully registered!</p>',
                        background: '#041c3d',
                        showConfirmButton: true,
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.props.history.push("/");
                        }
                    });
                }
            })
    }

    notifyUser = (cid, mobile, email) => {
        const mailAddress = email;
        const mailSubject = "Registration Notification" ;
        const mailBody = "Congratulations! Your registration is successful."

        axios.post(`https://icaf-backend.azurewebsites.net/api/sendEmails/Email/${mailAddress}/${mailSubject}/${mailBody}`)
            .then( res => console.log(res.data))
    }



    render() {
        const {name, email, mobile} = this.state;
        return (
            <div className={"reg-form-main-div"}>
                <h4 className={"reg-form-title"}>Attendee Registration</h4>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId={"regName"}>
                            <Form.Label className={"reg-form-label"}>Name</Form.Label>
                            <Form.Control className={"reg-form-input"} type={"text"} name={"name"} placeholder={"Enter name"} required
                                          value={name} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId={"regEmail"}>
                            <Form.Label className={"reg-form-label"}>Email</Form.Label>
                            <Form.Control className={"reg-form-input"} type={"email"} name={"email"} placeholder={"Enter email"}
                                          required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                          value={email} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId={"regMobile"}>
                            <Form.Label className={"reg-form-label"}>Mobile Number</Form.Label>
                            <Form.Control className={"reg-form-input"} type={"text"} name={"mobile"} placeholder={"Enter mobile number"}
                                          required maxLength={10} pattern="[0-9]{10}"
                                          value={mobile} onChange={this.handleChange}/>
                        </Form.Group>

                        <div className={"text-center"}>
                            <Button variant="primary" className={"reg-form-submit"} type={"submit"}>Submit</Button>
                        </div>


                    </Form>
            </div>
        )
    }

}

export default withRouter(RegAttendee);