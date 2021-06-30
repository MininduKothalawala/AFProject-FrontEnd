import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './MainUIs/Home/Home';
import Login from "./Login/Login";
import AdminNav from "./AdminDashboard/AdminNav";

import UpdateConferenceDetailsComponent from "./Editor/Update-ConferenceDetails.Component";
import AddConferenceDetailsComponent from "./Editor/Add-ConferenceDetails.Component";

import ListAllConferenceDetailsComponent from "./AdminDashboard/Conference/List-AllConferenceDetails.Component";
import ListPendingConferenceDetails from "./AdminDashboard/Conference/List-PendingConferenceDetails.Component";
import ListApprovedConferenceDetailsComponent from "./AdminDashboard/Conference/List-ApprovedConferenceDetails.Component";
import GettAllUsers from "./AdminDashboard/User/GettAllUsers";
import SignUp from "./Login/Signup";
import ConferenceRegistration from "./MainUIs/Conference/ConferenceRegistration";
import ConferenceDetails from "./MainUIs/Conference/ConferenceDetails";
import ResearchTemplates from "./MainUIs/Templates/ResearchTemplates";
import AdminProfile from "./AdminDashboard/User/AdminProfile";
import Payment from "./MainUIs/Payments/Payment";
import ProposalTemplates from "./MainUIs/Templates/ProposalTemplates";
import PresentationTemplates from "./MainUIs/Templates/PresentationTemplates";

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

                        <Route path="/updateConference/:id"   component={UpdateConferenceDetailsComponent}/>
                        <Route path="/addConference" component={AddConferenceDetailsComponent}/>
                        <Route path= "/listAllConference" component = {ListAllConferenceDetailsComponent} />
                        <Route path= "/listPendingConference" component = {ListPendingConferenceDetails} />
                        <Route path= "/listApprovedConference" component = {ListApprovedConferenceDetailsComponent} />

                        <Route path= "/conference/reg/:id" component = {ConferenceRegistration} />
                        <Route path= "/conference/:id" exact component = {ConferenceDetails} />

                        <Route path="/templates/research" exact component={ResearchTemplates}/>
                        <Route path="/templates/proposal" exact component={ProposalTemplates}/>
                        <Route path="/templates/presentation" exact component={PresentationTemplates}/>

                        <Route path="/payment/:id/:cid" exact component={Payment}/>

                    </Switch>

                </Router>



            </div>
        )
    }

}

export default Frontend;