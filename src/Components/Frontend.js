import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './MainUIs/Home/Home';
import Login from "./Login/Login";
import AdminNav from "./AdminDashboard/AdminNav";
import AddTemplates from "./AdminDashboard/Templates/AddTemplates";

import ConferenceDetailsListComponent from './Editor/Conference-Details-List.Component';
import UpdateConferenceDetailsComponent from "./Editor/Update-ConferenceDetails.Component";
import AddConferenceDetailsComponent from "./Editor/Add-ConferenceDetails.Component";

import ListAllConferenceDetailsComponent from "./AdminDashboard/Conference/List-AllConferenceDetails.Component";
import ListPendingConferenceDetails from "./AdminDashboard/Conference/List-PendingConferenceDetails.Component";
import ListApprovedConferenceDetailsComponent from "./AdminDashboard/Conference/List-ApprovedConferenceDetails.Component";
import TemplateList from "./AdminDashboard/Templates/TemplateList";
import GettAllUsers from "./AdminDashboard/User/GettAllUsers";
import SignUp from "./Login/Signup";
import ConferenceRegistration from "./MainUIs/Conference/ConferenceRegistration";
import EditTemplate from "./AdminDashboard/Templates/EditTemplates";
import ConferenceDetails from "./MainUIs/Conference/ConferenceDetails";
import Templates from "./MainUIs/Templates";
import AdminProfile from "./AdminDashboard/User/AdminProfile";

class Frontend extends Component {

    render() {
        return(
            <div>
                <Router>

                    {/*<Header/>*/}

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/signup" exact component={SignUp}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/profile" exact component={AdminProfile}/>
                        <Route path="/user/list" exact component={GettAllUsers}/>
                        <Route path="/admin" exact component={AdminNav}/>

                        <Route path="/conferenceList"   component={ConferenceDetailsListComponent}/>
                        <Route path="/updateConference/:id"   component={UpdateConferenceDetailsComponent}/>
                        <Route path="/addConference" component={AddConferenceDetailsComponent}/>
                        <Route path= "/listAllConference" component = {ListAllConferenceDetailsComponent} />
                        <Route path= "/listPendingConference" component = {ListPendingConferenceDetails} />
                        <Route path= "/listApprovedConference" component = {ListApprovedConferenceDetailsComponent} />

                        <Route path= "/conference/reg/:id" component = {ConferenceRegistration} />
                        <Route path= "/conference/:id" exact component = {ConferenceDetails} />

                        <Route path="/templates" exact component={Templates}/>
                        <Route path="/admin-template/add/" exact component={AddTemplates}/>
                        <Route path="/admin-template/edit/:id" exact component={EditTemplate}/>
                        <Route path="/admin-template/list" exact component={TemplateList}/>

                    </Switch>

                    {/*<Footer/>*/}
                </Router>



            </div>
        )
    }

}

export default Frontend;