import React, {Component} from "react";
import axios from "axios";
import {Button, Card, CardDeck, Container} from "react-bootstrap";
import "../Home/Home.css"
import {withRouter} from "react-router-dom";

class ConferenceDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cid: this.props.match.params.id,
            confName: '',
            date: '',
            startTime: '',
            endTime: '',
            venue: ''
        }
    }

    componentDidMount() {
        this.refreshEvent();
    }

    refreshEvent = () => {
        const id = this.state.cid

        axios.get(`http://localhost:8080/api/conference/conferencebyid/${id}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    confName: response.data.conferenceName,
                    date: response.data.date,
                    startTime: response.data.startingTime,
                    endTime: response.data.endingTime,
                    venue: response.data.venue
                })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    enroll = (id) => {
        this.props.history.push(`/conference/reg/${id}`)
    }

    render() {
        const {confName, date, startTime, endTime, venue} = this.state

        return (
            <div className={"pb-5"}>
                <Container fluid className={"p-0 mb-5 text-center"}>
                    <Container fluid className={"p-5 mb-5"} style={{backgroundColor: '#b8cccd', height: '500px'}}>
                        <h1 className={"display-1"} style={{textAlign: 'center'}}>{confName}</h1>
                        <h6 className={"text-muted"} style={{textAlign: 'center'}}>descriptiondescriptiondescriptiondescriptiondescriptiondescription</h6>
                        <div className={"my-5"}>
                            <Button variant={"danger"} type={"submit"} className={"p-3"}
                            onClick={() => this.enroll(this.state.cid)}>ENROL NOW</Button>
                        </div>
                    </Container>
                </Container>

                <Container style={{position: 'relative', top: '-90px'}}>
                    <Card className={"mb-1"}>
                        <Card.Body>
                            <Card.Title className={"text-center mb-5 mt-3"}>Keynote Speakers</Card.Title>
                            <CardDeck>
                                <Card style={{width: '18rem'}} className={"text-center"}>
                                    <Card.Body>
                                        <Card.Title>Keynote Speaker 1</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">position</Card.Subtitle>
                                        <Card.Text>Keynote speaker name</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{width: '18rem'}} className={"text-center"}>
                                    <Card.Body>
                                        <Card.Title>Keynote Speaker 1</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">position</Card.Subtitle>
                                        <Card.Text>Keynote speaker name</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{width: '18rem'}} className={"text-center"}>
                                    <Card.Body>
                                        <Card.Title>Keynote Speaker 1</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">position</Card.Subtitle>
                                        <Card.Text>Keynote speaker name</Card.Text>
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </Card.Body>
                    </Card>
                </Container>

                <Container>
                    <CardDeck>
                        <Card className={"mb-4 description"}>
                            <Card.Body>
                                <Card.Title style={{textAlign: 'center', marginTop: '30px'}}>Date and Time</Card.Title>
                                <Card.Text className="mt-4 lead" style={{textAlign: 'center', marginTop: '30px'}}>
                                    {date}<br/>
                                    {startTime}<br/>
                                    {endTime}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className={"mb-4 description"}>
                            <Card.Body>
                                <Card.Title style={{textAlign: 'center', marginTop: '30px'}}>
                                    Venue
                                </Card.Title>
                                <Card.Text style={{textAlign: 'center', marginTop: '30px'}}
                                           className="mt-4 lead">{venue}</Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Container>
            </div>
        )
    }
}

export default withRouter(ConferenceDetails);