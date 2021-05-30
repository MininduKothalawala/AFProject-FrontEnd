import React, {Component} from "react";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import "../Home/Home.css"
import {withRouter} from "react-router-dom";

class ConferencePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            conferences: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/conference/approvedConference/Approved`)
            .then(response => {
                console.log(response.data)
                this.setState({conferences: response.data})

            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSubmit = (id) => {
        this.props.history.push(`/conference/${id}`)
    }

    render() {
        return (
            <div>
                {
                    this.state.conferences.length > 0 ?
                        [
                            <Row key={0}>
                                {
                                    this.state.conferences.map(event =>
                                        <Col sm={4} className={"card-group mb-4"} key={event.id}>
                                            <Card className={"conference-card"} style={{width: '30rem'}} key={event.id} onClick={() => this.handleSubmit(event.id)}>
                                                <Card.Header><b>{event.conferenceName}</b></Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        Date: {event.date} <br/>
                                                        Venue: {event.venue} <br/>
                                                        Starts At: {event.startingTime} <br/>
                                                        End At: {event.endingTime}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                }
                            </Row>
                        ]
                        : <h5 className={"text-center"}>No Conferences Available</h5>
                }
            </div>
        )
    }
}

export default withRouter(ConferencePage);
