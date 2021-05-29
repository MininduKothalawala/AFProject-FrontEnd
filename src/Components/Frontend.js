import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home/Home';
import Header from "./Header-Footer/Header";
import Login from "./Login/Login";
import AdminNav from "./Header-Footer/AdminNav";
import TemplateList from "./AdminDashboard/Templates/TemplateList";
import AddTemplates from "./AdminDashboard/Templates/AddTemplates";
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
                        <Route path="/admin-template/add" exact component={AddTemplates}/>
                        <Route path="/admin-template/list" exact component={TemplateList}/>
                    </Switch>

                    {/*<Footer/>*/}
                </Router>
            </div>
        )
    }

}

export default Frontend;