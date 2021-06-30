import React, {Component} from "react";
import {withRouter} from "react-router";
import './AdminNav.css';
import AuthenticationService from "../Login/AuthenticationService";
import ChartComponents from "./ChartComponents";

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
                {/*<h3><ChartComponents/></h3>*/}
            </div>

        )
    }

}

export default withRouter(Dashboard);