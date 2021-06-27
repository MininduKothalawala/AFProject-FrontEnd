import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Badge, Button, Modal, Table} from "react-bootstrap";
import AuthenticationService from "../../Login/AuthenticationService";
import UpdateConferenceDetailsComponent from "../../Editor/Update-ConferenceDetails.Component";

const Conference = props => (

    <tr>

        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.startingDate}</td>
        <td>{props.conference.endingDate}</td>
        <td>{props.conference.venue}</td>
        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
            { props.conference.status === 'Approved' &&
                <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
            }
            { props.conference.status === 'Pending' &&
                <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
            }
            { props.conference.status === 'Rejected' &&
                <Badge variant="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
            }
            { props.conference.status === 'Updated' &&
                <Badge variant="primary" className={"px-3 py-2"} key={"0"}>UPDATED</Badge>
            }
            { props.conference.status === 'Expired' &&
                <Badge variant="info" className={"px-3 py-2"} key={"0"}>EXPIRED</Badge>
            }
            { props.conference.status === 'Canceled' &&
                <Badge variant="secondary" className={"px-3 py-2"} key={"0"}>CANCELED</Badge>
            }
        </td>
        { props.loggedAsEditor &&
            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                { props.conference.status !== 'Rejected' &&
                    <Button variant={"warning"} type={"submit"}><Link to = {"/updateConference/" +props.conference.id } >Edit</Link></Button>
                    // <Button variant={"dark"} type={"submit"} onClick={() => this.editConference(props.conference.id)}>Edit</Button>
                    // Todo: cannot access edit method here
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
            conferenceId:'',
            loggedAsEditor: false,
            show: false
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

        if (loggedUserRole != null && loggedUserRole === 'editor') {
            this.setState({
                loggedAsEditor: true,
            })
        }
    }

    conferenceList(){
        return this.state.conferences.map(currentconference => {
            return <Conference conference = {currentconference}  loggedAsEditor={this.state.loggedAsEditor} key={currentconference.id}/>
        })
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    editConference = (id) => {
        this.setState({conferenceId: id})
        this.handleShow();
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
                        { this.state.loggedAsEditor &&
                            <th className={"text-center"}>Edit</th>
                        }
                    </tr>
                    </thead>

                    <tbody>
                        {this.conferenceList()}
                    </tbody>
                </Table>


                {/*--------------------------Model Box to Edit Conference--------------------------*/}

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <UpdateConferenceDetailsComponent conferenceId={this.state.conferenceId} /> </Modal.Body>
                </Modal>

                {/*--------------------------------------------------------------------------------*/}

            </div>
        )
    }

}
export default ListAllConferenceDetailsComponent;