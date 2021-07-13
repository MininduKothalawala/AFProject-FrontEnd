import React, {Component} from "react";
import {withRouter} from "react-router";
import '../AdminNav.css';
import ConferenceChart from "./ConferenceChart";
import researchImg from "../../../Assets/microscope.svg"
import conductorhImg from "../../../Assets/presenter.svg"
import attendeeImg from "../../../Assets/collaboration.svg"
import {Image} from "react-bootstrap";
import ResearchStatusChart from "./ResearchStatusChart";
import ResearcherPaymentChart from "./ResearcherPaymentChart";
import AttendeePaymentChart from "./AttendeePaymentChart";
import axios from "axios";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            researcher: '',
            conductors: '',
            attendee: '',
        }
    }

    componentDidMount() {
        this.getResearcherCount();
        this.getConductorCount();
        this.getRAttendeeCount();
    }

    getResearcherCount() {
        axios.get("http://localhost:8080/api/information/getResearcherCount").then(res => {
            this.setState({researcher: res.data});
        });
    }

    getConductorCount() {
        axios.get("http://localhost:8080/api/information/getConductorCount").then(res => {
            this.setState({conductors: res.data});
        });
    }

    getRAttendeeCount() {
        axios.get("http://localhost:8080/api/information/getAttendeeCount").then(res => {
            this.setState({attendee: res.data});
        });
    }

    render() {

        return (
            <div>
                <div className={"dash-board-div"}>
                    <div className={"dash-card-main"}>
                        <Image src={researchImg} alt={"researcher-icon"} className={"dash-card-img"} />
                        <div>
                            <h1 className={"dash-card-count"}>{this.state.researcher}</h1>
                            <h6 className={"dash-card-title"}>Researchers</h6>
                        </div>
                    </div>
                    <div className={"dash-card-main"}>
                        <Image src={conductorhImg} alt={"conductor-icon"} className={"dash-card-img"} />
                        <div>
                            <h1 className={"dash-card-count"}>{this.state.conductors}</h1>
                            <h6 className={"dash-card-title"}>Conductors</h6>
                        </div>
                    </div>
                    <div className={"dash-card-main"}>
                        <Image src={attendeeImg} alt={"attendee-icon"} className={"dash-card-img"} />
                        <div>
                            <h1 className={"dash-card-count"}>{this.state.attendee}</h1>
                            <h6 className={"dash-card-title"}>Attendees</h6>
                        </div>
                    </div>
                </div>

                {/*------------------------------- Charts -------------------------------*/}
                <div className={"dash-board-charts-div"}>
                    <div className={"dash-chart-card-main"}>
                        <div className={"dash-chart-card"}>
                            <h3 className={"dash-chart-title"}>Conference Statistics</h3>
                            <ConferenceChart />
                        </div>
                    </div>
                    <div className={"dash-chart-card-main"}>
                        <div className={"dash-chart-card"}>
                            <h3 className={"dash-chart-title"}>Research Status Statistics</h3>
                            <ResearchStatusChart />
                        </div>
                    </div>
                    <div className={"dash-chart-card-main"}>
                        <div className={"dash-chart-card"}>
                            <h3 className={"dash-chart-title"}>Researcher Payment Statistics</h3>
                            <ResearcherPaymentChart />
                        </div>
                    </div>
                    <div className={"dash-chart-card-main"}>
                        <div className={"dash-chart-card"}>
                            <h3 className={"dash-chart-title"}>Attendee Payment Statistics</h3>
                            <AttendeePaymentChart />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Dashboard);