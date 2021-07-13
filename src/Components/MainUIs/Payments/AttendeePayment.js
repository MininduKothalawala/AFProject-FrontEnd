import React, {Component} from "react";
import '../../AdminDashboard/AdminNav.css';
import {Button, Col, Form, Row} from "react-bootstrap";
import moment from 'moment';
import "./Payment.css"
import PayDataService from "./PayDataService";
import * as Swal from "sweetalert2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class AttendeePayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attendeeId: '',
            conferenceId: '',
            attendeeName: '',
            attendeeEmail: '',
            c_name: '',
            amount: '',
            cardHolderName: '',
            cardNo: '',
            cvv: '',
            expMonth: '',
            expYear: '',
            cardPin:'',
            cardBalance: '',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            today: moment(new Date()).format('YYYY-MM-DD'),
        }
    }

    componentDidMount() {
        this.loadPaymentDetails();
    }

    loadPaymentDetails = () => {

        // PayDataService.loadPaymentDetails(url)
        //     .then( res => {
        //         console.log(res.data)
        //         this.setState({
        //             attendeeId: res.data.attendeeId,
        //             conferenceId: res.data.conferenceId,
        //             attendeeName: res.data.attendeeName,
        //             attendeeEmail: res.data.attendeeEmail,
        //             c_name: res.data.conferenceName,
        //             amount: res.data.amount
        //         })
        //     })
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlePayment = (e) => {
        e.preventDefault();

        let cnum = this.state.cardNo;
        let cvc = this.state.cvv
        let eMonth = this.state.expMonth;
        let eYear = this.state.expYear;

        //check for card validity
        PayDataService.getCardDetails(cnum)
            .then( res => {
                if (res.status === 200) {
                    console.log(res)

                    this.setState({
                        cardPin: res.data.cvv,
                        cardBalance: res.data.amount
                    })

                    if (this.state.cardPin === res.data.cvv) {
                        //check expiration
                        if (eMonth >= "01" && eMonth <= "12") {
                            if (eMonth >= this.state.month && eYear >= this.state.year) {
                                if (this.state.cardBalance > this.state.amount) {

                                    const formData = new FormData();
                                    formData.append('id', this.state.attendeeId)
                                    formData.append('p_status', "paid")

                                    PayDataService.updatePaymentAttendee(formData)
                                        .then( res => {

                                            if (res.status === 200) {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Successful',
                                                    html: '<p>Your will receive a confirmation email</p>',
                                                    background: '#041c3d',
                                                    confirmButtonColor: '#3aa2e7',
                                                    iconColor: '#60e004'
                                                })

                                                //send email
                                                this.notifyViaEmail(this.state.attendeeEmail)
                                            }
                                        })

                                } else {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Insufficient Balance!',
                                        background: '#041c3d',
                                        confirmButtonColor: '#3aa2e7',
                                        iconColor: '#e0b004'
                                    })

                                    this.setState({
                                        cvv: '',
                                        cardNo: '',
                                        expMonth: '',
                                        expYear: ''
                                    })
                                }
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Expired Card!',
                                    background: '#041c3d',
                                    confirmButtonColor: '#3aa2e7',
                                    iconColor: '#e0b004'
                                })

                                this.setState({
                                    cvv: '',
                                    cardNo: '',
                                    expMonth: '',
                                    expYear: ''
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Wrong Input!',
                                html: '<p>Please enter a valid number for month</p>',
                                background: '#041c3d',
                                confirmButtonColor: '#3aa2e7',
                                iconColor: '#e0b004'
                            })

                            this.setState({
                                cvv: '',
                                cardNo: '',
                                expMonth: '',
                                expYear: ''
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Incorrect CVV',
                            background: '#041c3d',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#e0b004'
                        })

                        this.setState({
                            cvv: '',
                            cardNo: '',
                            expMonth: '',
                            expYear: ''
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Invalid Card Number',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#e0b004'
                    })

                    this.setState({
                        cvv: '',
                        cardNo: '',
                        expMonth: '',
                        expYear: ''
                    })
                }
            })

    }

    notifyViaEmail = (email) => {
        console.log(email)
        const mail = email;
        const mailSubject = "Payment Notification" ;
        const mailBody = "Dear Participant,\n\n" +
            "Thank you! Your payment has been received.\n\n" +
            "Regards,\n" +
            "ICAF Support Team";

        PayDataService.paymentNotification(mail, mailSubject, mailBody)
            .then( res => console.log(res.data))
    }

    render() {

        const {attendeeId, attendeeName, attendeeEmail, c_name, amount, cardHolderName, cardNo, cvv, expMonth, expYear, today} = this.state;

        return (
            <div>
                <div className={"outer-div-center"}>
                    <div className={"payment-group"}>
                        <div className={"pay-summary-div"}>

                            <h3>PAYMENT SUMMARY</h3>

                            <div className={"pay-summary-content"}>
                                <h6>Participant Name</h6>
                                <p>{attendeeName}</p>
                            </div>
                            <div className={"pay-summary-content"}>
                                <h6>Participant Email</h6>
                                <p>{attendeeEmail}</p>
                            </div>
                            <div className={"pay-summary-content"}>
                                <h6>Conference Name</h6>
                                <p>{c_name}</p>
                            </div>
                            <div className={"pay-summary-content"}>
                                <h6>Date</h6>
                                <p>{today}</p>
                            </div>
                            <div className={"payment-content"}>
                                <h6>Amount To Be paid</h6>
                                <div>LKR {amount}.00</div>
                                <Link className="back-home" to="/"><FontAwesomeIcon icon={faArrowLeft} className={"mr-3"}/>Back to Home</Link>
                            </div>

                        </div>
                        <div className={"pay-form-div"}>
                            <Form onSubmit={this.handlePayment}>
                                <Form.Group controlId={"formCardName"} className={"pay-form-content"}>
                                    <Form.Label className={"pay-form-label"}>Your ID</Form.Label>
                                    <Form.Control type={"text"} name={"cardHolderName"}
                                                  className={"pay-input"} required
                                                  placeholder={"This was sent to you by mail"}
                                                  value={attendeeId} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group controlId={"formCardName"} className={"pay-form-content"}>
                                    <Form.Label className={"pay-form-label"}>Card Holder's Name</Form.Label>
                                    <Form.Control type={"text"} name={"cardHolderName"}
                                                  className={"pay-input"} required
                                                  placeholder={"Card holder's name"}
                                                  value={cardHolderName} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group controlId={"formCardNo"} className={"pay-form-content"}>
                                    <Form.Label className={"pay-form-label"}>Card Number</Form.Label>
                                    <Form.Control type={"text"} name={"cardNo"} className={"pay-input"} required
                                                  maxLength="16" pattern="[0-9]{16}" placeholder={"Card number"}
                                                  value={cardNo} onChange={this.handleChange}/>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group controlId={"formCardMonth"} className={"pay-form-content"}>
                                            <Form.Label className={"pay-form-label"}>Month</Form.Label>
                                            <Form.Control type={"text"} name={"expMonth"} className={"pay-input"} required
                                                          maxLength="2" pattern="[0-9]{2}" placeholder={"MM"}
                                                          value={expMonth} onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={"formCardYear"} className={"pay-form-content"}>
                                            <Form.Label className={"pay-form-label"}>Year</Form.Label>
                                            <Form.Control type={"text"} name={"expYear"} className={"pay-input"} required
                                                          maxLength="4" pattern="[0-9]{4}" placeholder={"YYYY"}
                                                          value={expYear} onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={"formCardCVV"} className={"pay-form-content"}>
                                            <Form.Label className={"pay-form-label"}>CVV</Form.Label>
                                            <Form.Control type={"password"} name={"cvv"} className={"pay-input"} required
                                                          maxLength="3" pattern="[0-9]{3}" placeholder={"CVV"}
                                                          value={cvv} onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId={"formSubmitBtn"} className={"text-center"}>
                                    <Button type={"submit"} className={"pay-btn"}>Pay Now</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default AttendeePayment;