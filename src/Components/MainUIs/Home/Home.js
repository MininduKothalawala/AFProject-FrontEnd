import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import ConferencePage from "../Conference/Conference";
import Header from "../../Header-Footer/Header";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Header/>

                <Container>
                    <ConferencePage/>
                </Container>
            </div>
        )
    }

}

export default Home;