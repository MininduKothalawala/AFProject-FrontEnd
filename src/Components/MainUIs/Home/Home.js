import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import ConferencePage from "../Conference/Conference";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return(
            <Container>
                <ConferencePage/>
            </Container>
        )
    }

}

export default Home;