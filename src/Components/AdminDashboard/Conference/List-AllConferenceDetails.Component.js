import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Badge, Button, Table} from "react-bootstrap";
import AuthenticationService from "../../Login/AuthenticationService";

const Conference = props => (

    <tr>

        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.startingDate}</td>
        <td>{props.conference.endingDate}</td>
        <td>{props.conference.venue}</td>
        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
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
            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                { props.conference.status !== 'Rejected' &&
                <Button variant={"dark"} type={"submit"}>Edit</Button>
                }
            </td>
        }

    </tr>
)
class ListAllConferenceDetailsComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            conferences : [],
            loggedAsEditor: false,
            loggedAsAdmin: false
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
                loggedAsEditor: true,
                loggedAsAdmin: false,
            })
        }
    }


    conferenceList(){
        return this.state.conferences.map(currentconference => {
            return <Conference conference = {currentconference}  loggedAsEditor={this.state.loggedAsEditor} key={currentconference.id}/>
        })
    }



    render() {

        return(
            <div style={{height: '400px'}}>
                <Table striped responsive hover bordered>
                    <thead>
                    <tr>
                        <th className={"text-center"}>ID</th>
                        <th className={"text-center"}>Conference Name</th>
                        <th className={"text-center"}>Starting Date</th>
                        <th className={"text-center"}>Ending Date</th>
                        <th className={"text-center"}>Venue</th>
                        <th className={"text-center"}>Status</th>
                        { this.state.loggedAsEditor &&
                            <th className={"text-center"}>Edit</th>
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