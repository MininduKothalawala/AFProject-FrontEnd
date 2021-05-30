import React, {Component} from 'react';
import {Container} from "react-bootstrap";

class Templates extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return(
            <Container>
                <h3 className={"text-center"}>No Templates Available</h3>
            </Container>
        )
    }

}

export default Templates;