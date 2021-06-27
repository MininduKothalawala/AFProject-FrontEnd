import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Container, Table} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

const Conference = props => (
    <tr>
        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.startingDate}</td>
        <td>{props.conference.endingDate}</td>
        <td>{props.conference.venue}</td>
        <td>
            { props.conference.status === "Approved" ?
                <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                : [ props.conference.status === "Rejected" ?
                    <Badge variant="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
                    : [ props.conference.status === "Pending" ?
                        <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge> : ''
                    ]
                ]

            }

        </td>
        <td>
            <ButtonGroup>
                <Button variant={"outline-warning"}>
                    <Link to = {`/updateConference/` +props.conference.id }>Edit</Link>
                </Button>
                {/*<Button onClick ={() => {props.editConference(props.conference.id)}}>Edit</Button>*/}
                <Button variant={"outline-danger"} onClick ={() => {props.deleteConference(props.conferences.id)}}>Delete</Button>
            </ButtonGroup>
        </td>
    </tr>
)

class ConferenceDetailsListComponent extends Component{

    constructor(props) {
        super(props);

        this.deleteConference = this.deleteConference.bind(this);

        this.state = { conferences : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/conference/getAll')
            .then(response => {
                this.setState({conferences: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

    }

    deleteConference(id){
        axios.delete('http://localhost:8080/api/conference/deleteConference' +id)
            .then(res => console.log(res.data));
        this.setState({
            conferences : this.state.conferences.filter(el => el.id !== id)
        })

    }

    conferenceList() {
        return this.state.conferences.map(currentconference => {
            return <Conference conference = {currentconference} deleteConference = {this.deleteConference} key = {currentconference.id}/>
        })
    }

    render() {
        return(
            <Container>

                <Table bordered responsive hover striped>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Conference Name</th>
                        <th>Starting Date</th>
                        <th>Ending Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.conferenceList()}
                    </tbody>
                </Table>
            </Container>
        )
    }
}
export default ConferenceDetailsListComponent;