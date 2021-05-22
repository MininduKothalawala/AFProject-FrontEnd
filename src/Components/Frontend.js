import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home/Home';
import Header from "./Header-Footer/Header";
import Login from "./Login/Login";
import AdminDashBoard from "./AdminDashboard/AdminDashBoard";
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
                        <Route path="/Admindashboard" exact component={AdminDashBoard}/>
                    </Switch>

                    {/*<Footer/>*/}
                </Router>

            </div>
        )
    }

}

export default Frontend;