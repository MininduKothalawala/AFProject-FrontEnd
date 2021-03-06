import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import AuthenticationService from "../../Login/AuthenticationService";

class UpdateConferenceDetailsComponent extends Component {

    constructor(props) {
        super(props);

        this.onChangeConferenceName = this.onChangeConferenceName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeConferenceDate = this.onChangeConferenceDate.bind(this);
        this.onChangeStartingDate = this.onChangeStartingDate.bind(this);
        this.onChangeEndingDate = this.onChangeEndingDate.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onChangePayment = this.onChangePayment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.conferenceId,
            conferenceName : '',
            description:'',
            startingDate : '',
            endingDate: '',
            username:'',
            venue : '',
            payment: '',
            status :'',
            daylimit: moment().add(10, "days").format('YYYY-MM-DD')
        }
    }

    componentDidMount() {

        const loggedUser = AuthenticationService.loggedUserId();
        

        axios.get('https://icaf-backend.azurewebsites.net/api/conference/conferencebyid/' + this.state.id)

            .then(response => {
                this.setState({
                    id: response.data.id,
                    conferenceName: response.data.conferenceName,
                    description: response.data.description,
                    startingDate: moment(response.data.startingDate).format('YYYY-MM-DD'),
                    endingDate: moment(response.data.endingDate).format('YYYY-MM-DD'),
                    username: loggedUser, //current user
                    venue: response.data.venue,
                    payment:response.data.payment,
                    status: response.data.status
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeConferenceName(e) {
        this.setState({
            conferenceName: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeConferenceDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeStartingDate(e) {
        this.setState({
            startingDate: e.target.value
        });
    }

    onChangeEndingDate(e) {
        this.setState({
            endingDate: e.target.value
        });
    }

    onChangeVenue(e) {
        this.setState({
            venue: e.target.value
        });
    }

    onChangePayment(e){
        this.setState({
            payment : e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let newStatus;

        //check for status
        if (this.state.status === 'Approved') {
            newStatus = 'Updated'
        } else if (this.state.status === 'Pending') {
            newStatus = 'Pending'
        } else if (this.state.status === 'Updated') {
            newStatus = 'Updated'
        }

        const conferences = {
            id: this.state.id,
            conferenceName: this.state.conferenceName,
            description: this.state.description,
            startingDate: moment(this.state.startingDate).format('YYYY-MM-DD'),
            endingDate: moment(this.state.endingDate).format('YYYY-MM-DD'),
            addedBy:this.state.username,
            venue: this.state.venue,
            payment:this.state.payment,
            status: newStatus,
        }

        console.log(conferences);

        axios.put('https://icaf-backend.azurewebsites.net/api/conference/updateConference', conferences)
            .then(res => {
                console.log(res)
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Conference has been added successfully!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.componentDidMount()
                        }
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>Unable to add a conference!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#e00404'
                    })
                }
            });


    }

    render() {
        return (
            <Card style={{border: 'none'}}>
                <Card.Body>
                    <Form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Conference ID : </label>
                            <input type="text"
                                   disabled
                                   className="form-control"
                                   value={this.state.id}
                            />
                        </div>

                        <div className="form-group">
                            <label>Name : </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.conferenceName}
                                   onChange={this.onChangeConferenceName}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description : </label>
                            <textarea
                                rows={4}
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>

                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label>Starting Date : </label>
                                    <input type="date"
                                           required
                                           className="form-control"
                                           min={this.state.daylimit}
                                           value={this.state.startingDate}
                                           onChange={this.onChangeStartingDate}
                                    />
                                </Col>
                                <Col>
                                    <label>Ending Date : </label>
                                    <input type="date"
                                           required
                                           className="form-control"
                                           min={moment(this.state.startingDate).format('YYYY-MM-DD')}
                                           value={this.state.endingDate}
                                           onChange={this.onChangeEndingDate}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="form-group">
                            <label>Added By : </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.username}
                            />
                        </div>

                        <div className="form-group">
                            <label>Venue : </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.venue}
                                   onChange={this.onChangeVenue}
                            />
                        </div>

                        <div className="form-group">
                            <label>Payment : </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.payment}
                                   onChange={this.onChangePayment}
                            />
                        </div>

                        <div className={"my-4"}>
                            <Button variant="primary" type={"submit"}>Update</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default UpdateConferenceDetailsComponent;
