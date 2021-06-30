import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './MainUIs/Home/Home';
import Login from "./Login/Login";
import AdminNav from "./AdminDashboard/AdminNav";
import GettAllUsers from "./AdminDashboard/User/GettAllUsers";
import SignUp from "./Login/Signup";
import ConferenceRegistration from "./MainUIs/Conference/ConferenceRegistration";
import ResearchTemplates from "./MainUIs/Templates/ResearchTemplates";
import AdminProfile from "./AdminDashboard/User/AdminProfile";
import AttendeePayment from "./MainUIs/Payments/AttendeePayment";
import ProposalTemplates from "./MainUIs/Templates/ProposalTemplates";
import PresentationTemplates from "./MainUIs/Templates/PresentationTemplates";
import ResearcherPayment from "./MainUIs/Payments/ResearcherPayment";
import ConferenceSubmissions from "./MainUIs/Conference/ConferenceSubmissions";

class Frontend extends Component {

    render() {
        return(
            <div>
                <Router>

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/signup" exact component={SignUp}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/profile" exact component={AdminProfile}/>
                        <Route path="/user/list" exact component={GettAllUsers}/>
                        <Route path="/admin" exact component={AdminNav}/>

                        <Route path= "/conference/reg/:id" component = {ConferenceRegistration} />
                        <Route path= "/conference/:id" component = {ConferenceSubmissions} />

                        <Route path="/templates/research" exact component={ResearchTemplates}/>
                        <Route path="/templates/proposal" exact component={ProposalTemplates}/>
                        <Route path="/templates/presentation" exact component={PresentationTemplates}/>

                        <Route path="/payment/attendee/:phone" exact component={AttendeePayment}/>
                        <Route path="/payment/researcher/:id" exact component={ResearcherPayment}/>

                    </Switch>

                </Router>



            </div>
        )
    }

}

export default Frontend;