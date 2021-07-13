import React, {Component} from "react";
import {Image, Tab, Tabs} from "react-bootstrap";
import RegResearcher from "./RegResearcher";
import RegConductor from "./RegConductor";
import RegAttendee from "./RegAttendee";
import {Link} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ConferenceMain.css"
import regImg from "../../../Assets/sign-up-img.png";

class ConferenceRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conference_id: this.props.match.params.id
        }
    }

    render() {

        return (
            <div>

                    {/*----------------------------------------Main Content----------------------------------------------*/}
                    <div>
                        <div className={"reg-main-container"}>
                            <div className={"reg-main-outer-div"}>
                                <div className={"reg-bg-image-div"}>
                                    <div className={"reg-home-div"}>
                                        <Link className="back-to-home" to="/"><FontAwesomeIcon icon={faArrowLeft} className={"mr-3"}/>Back to Home</Link>
                                        <Image className={"reg-bg-img"} src={regImg} alt="register-page-image"/>
                                    </div>
                                </div>
                                <div className={"reg-forms"}>
                                    <Tabs defaultActiveKey="research" variant={"pills"} className={"reg-tab-set"}>
                                        <Tab eventKey="research" title="Researchers">
                                            <RegResearcher id={this.state.conference_id} />
                                        </Tab>

                                        <Tab eventKey="workshop" title="Workshop Conductors">
                                            <RegConductor id={this.state.conference_id} />
                                        </Tab>

                                        <Tab eventKey="attendee" title="Attendees">
                                            <RegAttendee id={this.state.conference_id} />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>

                        </div>
                    </div>

            </div>
        )
    }

}

export default ConferenceRegistration;