import React, {Component} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import ConferencePage from "../Conference/Conference";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handleSubmit = () => {
        console.log("button clicked")
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