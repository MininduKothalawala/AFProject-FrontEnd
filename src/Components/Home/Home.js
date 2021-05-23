import React, {Component} from 'react';
import {Button, Card, Container} from "react-bootstrap";

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
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Conference Title</Card.Title>
                        <Card.Text>
                            Date: date <br/>
                            Venue: venue
                        </Card.Text>
                        <Button variant="primary" onClick={this.handleSubmit}>Enroll</Button>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

}

export default Home;