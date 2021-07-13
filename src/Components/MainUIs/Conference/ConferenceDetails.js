import React, {Component} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import moment from 'moment';
import bgImg from "../../../Assets/conf-details-bg.jpg";
import calendarCross from "../../../Assets/calendar-cross.svg";
import calendarTick from "../../../Assets/calendar-tick.svg";
import location from "../../../Assets/location-pin.svg";
import creditCard from "../../../Assets/credit-card (1).svg";
import Header from "../../Header-Footer/Header";
import "./ConferenceMain.css"
import axios from "axios";
import PaperSubmissionList from "./PaperSubmissionList";
import ProposalSubmissionList from "./ProposalSubmissionList";
import Footer from "../../Header-Footer/Footer";

class ConferenceDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title:'',
            description:'',
            startDate:'',
            endDate:'',
            venue:'',
            payment:''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/conference/conferencebyid/`+this.state.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    title:response.data.conferenceName,
                    description:response.data.description,
                    startDate:response.data.startingDate,
                    endDate:response.data.endingDate,
                    venue:response.data.venue,
                    payment:response.data.payment
                })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    enroll = (id) => {
        this.props.history.push(`/conference/reg/`+id)
    }

    render() {

        const {id, title, description, startDate, endDate, venue, payment} = this.state

        return(
            <div>
                {/*-----------------------------------------------Header---------------------------------------------*/}
                <div>
                    <div className={"conference-header"}>
                        <Header/>
                    </div>
                    <div className={"conference-bg-overlay"}>
                        <Image className={"conference-bg-img"} src={bgImg} alt="background image"/>
                    </div>
                    <Container className={"conference-title"}>
                        <h1>{title}</h1>
                        <div className={"conference-breadcrumb"}>
                            <h5>
                                <a href={"/"} >Home > </a>
                                <a href={"/conference"} >Conferences > </a>
                                {title}
                            </h5>
                        </div>
                    </Container>
                </div>

                {/*----------------------------------------Main Content----------------------------------------------*/}
                <div className={"conf-details-main-div"}>
                    <Container className={"p-0"}>
                        <Row>
                           <Col>
                               <div className={"conf-details-grid"}>
                                   {/*------------------------- Conference Description -------------------------*/}
                                   <div className={"conf-details-card"}>
                                       <div>
                                           <h5>Description</h5>
                                       </div>
                                       <hr/>
                                       <div>
                                           <p className={"mx-5"}>{description}</p>
                                       </div>
                                   </div>

                                   <div className={"conf-details-card"}>
                                       {/*------------------------- Conference Submissions -------------------------*/}
                                       <div>
                                           <h5>Submissions</h5>
                                       </div>
                                       <hr/>
                                       <div>
                                           <div className={"mx-0 mb-5"}>
                                               <h5>Research Paper Submissions</h5>
                                               <div className={"mt-5 mx-5"}>
                                                   <PaperSubmissionList conferenceID={id} />
                                               </div>
                                           </div>
                                           <hr/>
                                           <div className={"mx-0"}>
                                               <h5>Workshop Proposal Submissions</h5>
                                               <div className={"mt-5 mx-5"}>
                                                   <ProposalSubmissionList conferenceID={id} />
                                               </div>
                                           </div>

                                       </div>
                                   </div>

                               </div>
                           </Col>
                            {/*------------------------- Conference Details Card -------------------------*/}
                            <Col sm={4}>
                                <div className={"conf-details-card"}>
                                    <div>
                                        <h5>Conference Details</h5>
                                    </div>
                                    <hr/>
                                    <div className={"conf-details-item"}>

                                        <div className={"conf-icon-flex mx-0 pt-2 pb-4"}>
                                            <Image className={"conf-details-icons"} src={calendarTick} alt="calendar-icon-tick"/>
                                            <div className={"mx-0"}>
                                                <h6>START DATE</h6>
                                                <p className={"mx-0 mb-0"}>{moment(startDate).format("MMMM DD, YYYY")}</p>
                                            </div>
                                        </div>
                                        <div className={"conf-icon-flex mx-0 py-4"}>
                                            <Image className={"conf-details-icons"} src={calendarCross} alt="calendar-icon-tick"/>
                                            <div className={"mx-0"}>
                                                <h6>END DATE</h6>
                                                <p className={"mx-0 mb-0"}>{moment(endDate).format("MMMM DD, YYYY")}</p>
                                            </div>
                                        </div>
                                        <div className={"conf-icon-flex mx-0 py-4"}>
                                            <Image className={"conf-details-icons"} src={location} alt="calendar-icon-tick"/>
                                            <div className={"mx-0"}>
                                                <h6>LOCATION</h6>
                                                <p className={"mx-0 mb-0"}>{venue}</p>
                                            </div>
                                        </div>
                                        <div className={"conf-icon-flex mx-0 py-4"}>
                                            <Image className={"conf-details-icons"} src={creditCard} alt="calendar-icon-tick"/>
                                            <div className={"mx-0"}>
                                                <h6>PAYMENT</h6>
                                                <p className={"mx-0 mb-0"}>LKR {payment}.00</p>
                                            </div>
                                        </div>
                                        <div className={"mx-4"}>
                                            <Button type={"submit"} className={"conf-details-btn"} block onClick={() => this.enroll(id)} >ENROLL</Button>
                                        </div>

                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>

                {/*-----------------------------------------------Footer---------------------------------------------*/}
                <div>
                    <Footer />
                </div>
            </div>
        )
    }

}

export default ConferenceDetails;