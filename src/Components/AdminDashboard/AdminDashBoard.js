import React, {Component} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import AuthenticationService from '../Authentication/AuthenticationService';

class AdminDashBoard extends Component {


    state = {}


    render() {


        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();
        const loggedUser = AuthenticationService.loggedUserName();
        let loggedAsAdmin = false;
        let loggedAsReviever = false;
        let loggedAsEditor = false;

        if (loggedUserRole != null && loggedUserRole === 'admin') {
            loggedAsAdmin = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'reviever') {
            loggedAsReviever = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'editor') {
            loggedAsEditor = true;
        }

        return (
            <div>
                <h1>
                    <center>Admin Dashboard</center>
                </h1>
                {loggedAsAdmin &&
                <>
                    <h1>login as an admin</h1>

                </>

                }
                {loggedAsReviever &&
                <>
                    <h1>login as a reviver</h1>

                </>

                }
                {loggedAsEditor &&
                <>
                    <h1>login as a Editor</h1>

                </>

                }


            </div>
        )
    }

}

export default AdminDashBoard;