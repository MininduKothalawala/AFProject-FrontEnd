import React, {Component} from "react";
import {withRouter} from "react-router";
import './AdminNav.css';
import AuthenticationService from "../Authentication/AuthenticationService";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUser = AuthenticationService.loggedUserName();

        return (
            <div>
                <h3>Dashboard</h3>
            </div>

        )
    }

}

export default withRouter(Dashboard);