import React, {Component} from "react";
import {Accordion, Button, Card, Container, Form, Tab, Tabs} from "react-bootstrap";
import * as Swal from "sweetalert2";
import ConferenceRegDataService from "./ConferenceRegDataService";
import RegResearcher from "./RegResearcher";
import RegConductor from "./RegConductor";

class ConferenceRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {

        return (
            <Container>
                <Tabs defaultActiveKey="research">
                    <Tab eventKey="research" title="For Researchers">
                       <RegResearcher />
                    </Tab>

                    <Tab eventKey="workshop" title="For Workshop Conductors">
                        <RegConductor />
                    </Tab>
                </Tabs>
            </Container>
        )
    }

}

export default ConferenceRegistration;