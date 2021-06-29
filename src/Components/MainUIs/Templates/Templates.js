import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import Header from "../../Header-Footer/Header";

class Templates extends Component {
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
                    <h3 className={"text-center"}>No Templates Available</h3>
                </Container>
            </div>
        )
    }

}

export default Templates;