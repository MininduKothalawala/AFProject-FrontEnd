import React, {Component} from 'react';
import Header from "../../Header-Footer/Header";
import {Carousel, Container, Image, Row} from "react-bootstrap";
import bgImg from "../../../Assets/landing-page-bg.jpg"
import cardImg from "../../../Assets/img2.png"
import "./Home.css"
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Header-Footer/Footer";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conferences: [],
        }
    }

    componentDidMount() {
        axios.get(`https://icaf-backend.azurewebsites.net/api/conference/approvedConference/Approved`)
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
                    <div className={"icaf-header"}>
                        <Header/>
                    </div>
                    <div className={"icaf-carousel-img-overlay"}>
                        <Image className={"icaf-carousel-img"} src={bgImg} alt="background image"/>
                    </div>
                    <div className={"icaf-home-carousel"}>
                        <Carousel>
                            {
                                this.state.conferences.map(event =>

                                    <Carousel.Item key={event.id}>
                                        <div>
                                            <Image className={"icaf-carousel-image"} src={bgImg} alt="background image"/>
                                        </div>
                                        <Carousel.Caption className={"icaf-carousel-caption"}>
                                            <Container>
                                                <h1>{event.conferenceName}</h1>
                                            </Container>
                                        </Carousel.Caption>

                                    </Carousel.Item>
                                )}
                        </Carousel>
                    </div>
                </div>

                {/*----------------------------------------Main Content----------------------------------------------*/}
                <div >
                    <Container className= {"upcoming-conferences-title"}>
                        <div>
                            <h2 className={"conference-text"}>Upcoming <span>Conferences</span></h2>
                            <hr className={"conference-line"} />
                        </div>
                    </Container>
                    <Container className={"upcoming-conference-list"}>
                        <Row>
                            {
                                this.state.conferences.slice(0,3).map(event =>

                                    <div className={"conference-card-col mb-4"} key={event.id}>

                                        <div className={"conference-card"} onClick={() => this.gotoDetails(event.id)}>
                                            <div className={"text-center image-card"}>
                                                <img alt={"card"} width={300}
                                                     src={cardImg}/>
                                            </div>
                                            <div className={"conference-card-body"}>
                                                <h5 className={"text-center"}>{event.conferenceName}</h5>
                                                <p className={"text-center"}><FontAwesomeIcon icon={faMapMarkerAlt} className={"mr-3"}/>{event.venue}</p>
                                                <p className={"text-center"}><FontAwesomeIcon icon={faMoneyBill} className={"mr-3"}/>LKR {event.payment}.00</p>
                                            </div>
                                        </div>

                                    </div>

                                )}
                        </Row>
                    </Container>
                    <Container className={"text-center"}>
                        <Link to={"/conference"} className={"home-conference-btn"}>ALL CONFERENCES</Link>
                    </Container>
                </div>

                {/*-----------------------------------------------Footer---------------------------------------------*/}
                <div className={"mt-5 pt-5"}>
                    <Footer />
                </div>
            </div>

        )
    }

}

export default Home;