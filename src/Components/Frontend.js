import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home/Home';
import Header from "./Header-Footer/Header";
import Login from "./Login/Login";
import AdminNav from "./Header-Footer/AdminNav";
import AddTemplates from "./AdminDashboard/Templates/AddTemplates";
import OtherTemplates from "./AdminDashboard/Templates/OtherTemplates";
// import Footer from "./Header-Footer/Footer";

import ConferenceDetailsListComponent from './Editor/Conference-Details-List.Component';
import UpdateConferenceDetailsComponent from "./Editor/Update-ConferenceDetails.Component";
import AddConferenceDetailsComponent from "./Editor/Add-ConferenceDetails.Component";

import ListAllConferenceDetailsComponent from "./Admin/List-AllConferenceDetails.Component";
import ListPendingConferenceDetails from "./Admin/List-PendingConferenceDetails.Component";
import ListApprovedConferenceDetailsComponent from "./Admin/List-ApprovedConferenceDetails.Component";
import TemplateList from "./AdminDashboard/Templates/TemplateList";

class Frontend extends Component {

    render() {
        return(
            <div className="Frontend">
                <Router>

                    <Header/>

                    <Switch>
                        <Route path="/" exact component={Home}/>

                        <Route path="/conferenceList"   component={ConferenceDetailsListComponent}/>
                        <Route path="/updateConference/:id"   component={UpdateConferenceDetailsComponent}/>
                        <Route path="/addConference"   component={AddConferenceDetailsComponent}/>
                        <Route path = "/listAllConference" component = {ListAllConferenceDetailsComponent} />
                        <Route path = "/listPendingConference" component = {ListPendingConferenceDetails} />
                        <Route path = "/listApprovedConference" component = {ListApprovedConferenceDetailsComponent} />

                        <Route path="/Login" exact component={Login}/>
                        <Route path="/Admindashboard" exact component={AdminNav}/>
                        <Route path="/admin-template/add/:id" exact component={AddTemplates}/>
                        <Route path="/admin-template/list" exact component={TemplateList}/>
                        <Route path="/admin-template/other" exact component={OtherTemplates}/>

                    </Switch>

                    {/*<Footer/>*/}
                </Router>
            </div>
        )
    }

}

export default Frontend;