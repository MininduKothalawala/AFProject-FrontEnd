import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Image} from "react-bootstrap";
import notFoundImg from "../../Assets/404 Page Not Found _Two Color.svg";
import "./404NotFound.css"

export default class NotFound extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div className={"not-found-div"}>
                    <Image className={"not-found-img"} src={notFoundImg} alt="calendar-icon-tick"/>
                </div>
                <div className={"not-found-btn-div"}>

                    <Link to="/" className={"not-found-home"}>Back to Home</Link>
                </div>
            </div>

        );
    }
}