import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Badge, Button, ButtonGroup, Table} from "react-bootstrap";
import AuthenticationService from "../Authentication/AuthenticationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

const Conference = props => (

    <tr key={props.conference.id}>

        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.date}</td>
        <td>{props.conference.startingTime}</td>
        <td>{props.conference.endingTime}</td>
        <td>{props.conference.venue}</td>
        <td>
            {
                props.conference.status === 'Approved' ?
                    <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                    : [
                        props.conference.status === 'Pending' ?
                            <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                            : [
                                props.conference.status === 'Rejected' ?
                                    <Badge variant="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge> : ''
                            ]
                    ]
            }
        </td>
        { props.loggedAsEditor &&
            <td>
                <Button variant={"dark"} type={"submit"}>Edit</Button>
            </td>
        }
        { props.loggedAsAdmin &&
            <td>
                <ButtonGroup>
                    <Button variant={"warning"} type={"submit"}
                    >
                        <FontAwesomeIcon icon={faCheck}/>
                    </Button>
                    <Button variant={"danger"} type={"submit"}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </Button>

                </ButtonGroup>
            </td>
        }

    </tr>
)
class ListAllConferenceDetailsComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            conferences : [],
            loggedAsAdmin: false,
            loggedAsEditor: false
        }
    }

    componentDidMount() {
        //to get user roles
        this.loggedUser();

        axios.get('http://localhost:8080/api/conference/getAll')
            .then(response => {
                this.setState({conferences: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }

    loggedUser() {
        let loggedUserRole = AuthenticationService.loggedUserRole();

        if (loggedUserRole != null && loggedUserRole === 'admin') {
            this.setState({
                loggedAsAdmin: true,
                loggedAsEditor: false
            })
        }
        else if (loggedUserRole != null && loggedUserRole === 'editor') {
            this.setState({
                loggedAsAdmin: false,
                loggedAsEditor: true
            })
        }
    }


    conferenceList(){
        return this.state.conferences.map(currentconference => {
            return <Conference conference = {currentconference} />
        })
    }



    render() {
        const {loggedAsAdmin, loggedAsEditor} = this.state;

        return(
            <div>
                <Table striped responsive hover bordered>
                    <thead>
                    <tr>
                        <th className={"text-center"}>ID</th>
                        <th className={"text-center"}>Conference Name</th>
                        <th className={"text-center"}>Date</th>
                        <th className={"text-center"}>Starting Time</th>
                        <th className={"text-center"}>Ending Time</th>
                        <th className={"text-center"}>Venue</th>
                        <th className={"text-center"}>Status</th>
                        { loggedAsEditor &&
                            <th className={"text-center"}>Edit</th>
                        }
                        { loggedAsAdmin &&
                            <th className={"text-center"}>Update Status</th>
                        }
                    </tr>
                    </thead>

                    <tbody>
                        {this.conferenceList()}
                    </tbody>
                </Table>
            </div>
        )
    }

}
export default ListAllConferenceDetailsComponent;