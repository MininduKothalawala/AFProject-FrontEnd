import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Row} from "react-bootstrap";
import "./ConferenceMain.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

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

    enroll = (id) => {
        this.props.history.push(`/conference/reg/${id}`)
    }

    details = (id) => {
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
                                        <Col sm={5} className={"card-group mb-4"} key={event.id}>
                                            <div className={"conference-card"} key={event.id}>
                                                <div className={"text-center image-card"}>
                                                    <img alt={"card"} width={300}
                                                         src={require('../../../Assets/img2.png').default}/>
                                                </div>
                                                <div className={"conference-card-body"}>
                                                    <h5 className={"text-center"}>{event.conferenceName}</h5>
                                                    <h6 className={"text-center conference-venue"}><FontAwesomeIcon icon={faMapMarkerAlt} className={"mr-3"}/> {event.venue}</h6>
                                                    <div className={"date-card-grid"}>
                                                            <div className={"date-card"}>
                                                                <h6>Start</h6>
                                                                <h3>{moment(event.startingDate).format("DD")}</h3>
                                                                <p>{moment(event.startingDate).format("MMM YYYY")}</p>
                                                            </div>
                                                            <div className={"date-card"}>
                                                                <h6>End</h6>
                                                                <h3>{moment(event.endingDate).format("DD")}</h3>
                                                                <p>{moment(event.endingDate).format("MMM YYYY")}</p>
                                                            </div>
                                                    </div>
                                                    <div className={"p-3"}>
                                                        <Button variant={"primary"} block className={"p-3"} onClick={() => this.details(event.id)}>Submissions</Button>
                                                    </div>
                                                    <div className={"px-3 pb-3 pt-2"}>
                                                        <Button variant={"danger"} block className={"p-3"} onClick={() => this.enroll(event.id)}>ENROLL</Button>
                                                    </div>
                                                </div>
                                            </div>
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
