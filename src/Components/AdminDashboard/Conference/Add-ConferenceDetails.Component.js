import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import moment from 'moment';
import Swal from "sweetalert2";
import AuthenticationService from "../../Login/AuthenticationService";

class AddConferenceDetailsComponent extends Component{

    constructor(props){
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeConferenceName = this.onChangeConferenceName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartingDate = this.onChangeStartingDate.bind(this);
        this.onChangeEndingDate = this.onChangeEndingDate.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);

        this.state = {
            id : '',
            conferenceName : '',
            description:'',
            startingDate : '',
            endingDate: '',
            username:'',
            venue : '',
            payment: '',
            status :'Pending',  //initial state is 'pending'
            daylimit: moment().add(10, "days").format('YYYY-MM-DD')
        }
    }

    componentDidMount() {
        const loggedUser = AuthenticationService.loggedUserId();
        this.setState({
            username: loggedUser
        });
    }

    onChangeID(e){
        this.setState({
            id : e.target.value
        });
    }

    onChangeConferenceName(e){
        this.setState({
            conferenceName : e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description : e.target.value
        });
    }

    onChangeStartingDate(e){
        this.setState({
            startingDate : e.target.value
        });
    }

    onChangeEndingDate(e){
        this.setState({
            endingDate : e.target.value
        });
    }

    onChangeVenue(e){
        this.setState({
            venue : e.target.value
        });
    }

    onChangePayment(e){
        this.setState({
            payment : e.target.value
        });
    }

    onSubmit2(e){
        e.preventDefault();

        const conferences = {
            id: this.state.id.toUpperCase(),
            conferenceName: this.state.conferenceName,
            description: this.state.description,
            startingDate: moment(this.state.startingDate).format('YYYY-MM-DD'),
            endingDate: moment(this.state.endingDate).format('YYYY-MM-DD'),
            addedBy: this.state.username,
            venue: this.state.venue,
            status: this.state.status,
            payment: this.state.payment,
        }

        console.log(conferences);

        axios.post('https://icaf-backend.azurewebsites.net/api/conference/addConference', conferences)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Your file has been uploaded!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error uploading!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#e00404'
                    })
                }
            });
    }

    render(){
        return(
            <div>
                <Card style={{border: 'none'}}>
                    <Card.Body className={"p-0"}>
                        <Form onSubmit={this.onSubmit2}>
                            <div className = "form-group">
                                <Row>
                                    <Col md={4}>
                                            <label>Conference ID : </label>
                                            <input type = "text"
                                                   required
                                                   className = "form-control"
                                                   value = {this.state.id}
                                                   onChange = {this.onChangeID}
                                                   placeholder={"Enter conference ID"}
                                            />
                                    </Col>
                                    <Col>
                                        <label>Conference Name : </label>
                                        <input type = "text"
                                               required
                                               className = "form-control"
                                               value = {this.state.conferenceName}
                                               onChange = {this.onChangeConferenceName}
                                               placeholder={"Enter conference name"}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className = "form-group">
                                <label>Conference Description : </label>
                                <textarea
                                    required
                                    className = "form-control"
                                    value = {this.state.description}
                                    onChange = {this.onChangeDescription}
                                    placeholder={"Enter description"}
                                />
                            </div>

                            <div className = "form-group">
                                <Row>
                                    <Col>
                                        <label>Starting Date : </label>
                                        <input type = "date"
                                               required
                                               className = "form-control"
                                               min={this.state.daylimit}
                                               value = {this.state.startingDate}
                                               onChange = {this.onChangeStartingDate}
                                        />
                                    </Col>
                                    <Col>
                                        <label>Ending Date : </label>
                                        <input type = "date"
                                               required
                                               className = "form-control"
                                               min={moment(this.state.startingDate).format('YYYY-MM-DD')}
                                               value = {this.state.endingDate}
                                               onChange = {this.onChangeEndingDate}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className = "form-group">
                                <Row>
                                    <Col>
                                        <label>Venue : </label>
                                        <input type = "text"
                                               required
                                               className = "form-control"
                                               value = {this.state.venue}
                                               onChange = {this.onChangeVenue}
                                               placeholder={"Enter venue"}
                                        />
                                    </Col>
                                    <Col>
                                        <label>Payment : </label>
                                        <input type = "text"
                                               required
                                               className = "form-control"
                                               value = {this.state.payment}
                                               onChange = {this.onChangePayment}
                                               placeholder={"Enter payment"}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className={"my-4"}>
                                <Button variant="primary" type={"submit"}>Submit</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default  AddConferenceDetailsComponent;