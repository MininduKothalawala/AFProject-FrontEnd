import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home/Home';
import UserRegistration from './UserRegistration/UserRegistration'
import Header from "./Header-Footer/Header";
// import Footer from "./Header-Footer/Footer";

class Frontend extends Component {

    render() {
        return(
            <div className="Frontend">

                <Router>

                    <Header/>

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/userRegistration" exact component={UserRegistration}/>
                    </Switch>

                    {/*<Footer/>*/}
                </Router>

            </div>
        )
    }

}

export default Frontend;
