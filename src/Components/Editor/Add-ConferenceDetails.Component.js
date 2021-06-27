import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import moment from 'moment';
import Swal from "sweetalert2";

class AddConferenceDetailsComponent extends Component{

    constructor(props){
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeConferenceName = this.onChangeConferenceName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartingDate = this.onChangeStartingDate.bind(this);
        this.onChangeEndingDate = this.onChangeEndingDate.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);

        this.state = {
            id : '',
            conferenceName : '',
            description:'',
            startingDate : '',
            endingDate: '',
            venue : '',
            status :'Pending',  //initial state is 'pending'
            daylimit: moment().add(10, "days").format('YYYY-MM-DD')
        }
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

    onChangeStatus(e){
        this.setState({
            status : e.target.value
        });
    }

    onSubmit2(e){
        e.preventDefault();

        const conferences = {
            id: this.state.id,
            conferenceName: this.state.conferenceName,
            description: this.state.description,
            startingDate: this.state.startingDate,
            endingDate: this.state.endingDate,
            venue: this.state.venue,
            status: this.state.status,
        }

        console.log(conferences);

        axios.post('http://localhost:8080/api/conference/addConference', conferences)
            .then(res => {
                console.log(res.data)

                // if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Your file has been uploaded!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })
                // }
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
                                    onChange = {this.onChangeConferenceDesc}
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
                                <label>Venue : </label>
                                <input type = "text"
                                       required
                                       className = "form-control"
                                       value = {this.state.venue}
                                       onChange = {this.onChangeVenue}
                                       placeholder={"Enter venue"}
                                />
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