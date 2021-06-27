import React, {Component} from "react";
import axios from "axios";
import AuthenticationService from "../../Login/AuthenticationService";
import {Badge, Table} from "react-bootstrap";

const Conference = props => (
    <tr>
        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.startingDate}</td>
        <td>{props.conference.endingDate}</td>
        <td>{props.conference.venue}</td>
        <td style={{verticalAlign: 'middle'}}>
            {/*{props.conference.status}*/}
            <Badge variant="success" className={"px-3 py-2"} >APPROVED</Badge>
        </td>
    </tr>
)

class ListApprovedConferenceDetailsComponent extends Component{

    constructor(props) {
        super(props);

        this.state = { conferences : [] }
    }

    componentDidMount() {
        //to get user roles
        this.loggedUser();

        axios.get('http://localhost:8080/api/conference/approvedConference/Approved')
            .then(response => {
                this.setState({conferences: response.data})
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
            return <Conference conference = {currentconference} />
        })
    }



    render() {
        return(
            <div>

                <Table striped responsive hover bordered>
                    <thead>
                    <tr>
                        <th className={"text-center"}>ID</th>
                        <th className={"text-center"}>Conference Name</th>
                        <th className={"text-center"}>Starting Date</th>
                        <th className={"text-center"}>Ending Date</th>
                        <th className={"text-center"}>Venue</th>
                        <th className={"text-center"}>Status</th>
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
export default ListApprovedConferenceDetailsComponent;