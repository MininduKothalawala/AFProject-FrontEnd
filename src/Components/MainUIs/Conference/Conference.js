import React, {Component} from "react";
import axios from "axios";
import {Container, Image, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";
import {faMapMarkerAlt, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header-Footer/Header";
import bgImg from "../../../Assets/conferences-bg.jpg";
import cardImg from "../../../Assets/img2.png";
import Footer from "../../Header-Footer/Footer";
import "./ConferenceMain.css"

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

    gotoDetails = (id) => {
        this.props.history.push(`/conference/`+id)
    }

    render() {
        return (

            <div>
                {/*-----------------------------------------------Header---------------------------------------------*/}
                <div>
                    <div className={"conference-header"}>
                        <Header/>
                    </div>
                    <div className={"conference-page-img-overlay"}>
                        <Image className={"conference-page-img"} src={bgImg} alt="background image"/>
                    </div>
                    <Container className={"conference-page-title"}>
                        <h1 className={"conference-page-title-h1"}>Conferences</h1>
                        <div className={"conference-breadcrumb"}>
                            <h5 className={"conference-page-title-h5"}>
                                <a href={"/"} >Home > </a>
                                Conferences
                            </h5>
                        </div>
                    </Container>
                </div>

                {/*----------------------------------------Main Content----------------------------------------------*/}
                <div >
                    <Container>


                        <div className={"conference-outer-div"}>
                            {
                                this.state.conferences.length > 0 ?
                                    [
                                        <Row key={0} className={"conference-card-row"}>
                                            {
                                                this.state.conferences.map(event =>

                                                    <div className={"conference-card-col mb-4"} key={event.id}>
                                                        <div className={"conference-card"} key={event.id} onClick={() => this.gotoDetails(event.id)}>
                                                            <div className={"text-center image-card"}>
                                                                <img alt={"card-background-image"} width={300}
                                                                     src={cardImg}/>
                                                            </div>
                                                            <div className={"conference-card-body"}>
                                                                <h5 className={"text-center"}>{event.conferenceName}</h5>
                                                                <p className={"text-center"}><FontAwesomeIcon icon={faMapMarkerAlt} className={"mr-3"}/> {event.venue}</p>
                                                                <p className={"text-center"}><FontAwesomeIcon icon={faMoneyBill} className={"mr-3"}/>LKR {event.payment}.00</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Row>
                                    ]
                                    : <h1 className={"text-center my-5"}>No Conferences Available</h1>
                            }
                        </div>


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

export default withRouter(ConferencePage);
