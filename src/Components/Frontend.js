import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home/Home';
import Header from "./Header-Footer/Header";
import Login from "./Login/Login";
import AdminNav from "./Header-Footer/AdminNav";
import PowerpointTemplates from "./AdminDashboard/Templates/PowerpointTemplates";
import ResearchTemplates from "./AdminDashboard/Templates/ResearchTemplates";
import OtherTemplates from "./AdminDashboard/Templates/OtherTemplates";
// import Footer from "./Header-Footer/Footer";

class Frontend extends Component {

    render() {
        return(
            <div className="Frontend">
                <Router>

                    <Header/>

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/Login" exact component={Login}/>
                        <Route path="/Admindashboard" exact component={AdminNav}/>
                        <Route path="/admin-template/research" exact component={ResearchTemplates}/>
                        <Route path="/admin-template/powerpoint" exact component={PowerpointTemplates}/>
                        <Route path="/admin-template/other" exact component={OtherTemplates}/>
                    </Switch>

                    {/*<Footer/>*/}
                </Router>
            </div>
        )
    }

}

export default Frontend;