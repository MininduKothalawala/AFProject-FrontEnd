import React, {Component} from "react";
import {Container, Tab, Tabs} from "react-bootstrap";
import RegResearcher from "./RegResearcher";
import RegConductor from "./RegConductor";
import RegAttendee from "./RegAttendee";

class ConferenceRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conference_id: this.props.match.params.id
        }
    }

    render() {

        return (
            <Container>
                <Tabs defaultActiveKey="research">
                    <Tab eventKey="research" title="For Researchers">
                       <RegResearcher id={this.state.conference_id} />
                    </Tab>

                    <Tab eventKey="workshop" title="For Workshop Conductors">
                        <RegConductor id={this.state.conference_id} />
                    </Tab>

                    <Tab eventKey="attendee" title="For Attendees">
                        <RegAttendee id={this.state.conference_id} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }

}

export default ConferenceRegistration;