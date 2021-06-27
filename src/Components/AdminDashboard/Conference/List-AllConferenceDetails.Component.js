import React, {Component} from "react";
import axios from "axios";
import {Badge, Button, ButtonGroup, Modal, Table} from "react-bootstrap";
import AuthenticationService from "../../Login/AuthenticationService";
import UpdateConferenceDetailsComponent from "../../Editor/Update-ConferenceDetails.Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Conference = props => (

    <tr>

        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.startingDate}</td>
        <td>{props.conference.endingDate}</td>
        <td>{props.conference.venue}</td>
        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
            {props.conference.status === 'Approved' &&
            <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
            }
            {props.conference.status === 'Pending' &&
            <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
            }
            {props.conference.status === 'Rejected' &&
            <Badge variant="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
            }
            {props.conference.status === 'Updated' &&
            <Badge variant="primary" className={"px-3 py-2"} key={"0"}>UPDATED</Badge>
            }
            {props.conference.status === 'Expired' &&
            <Badge variant="info" className={"px-3 py-2"} key={"0"}>EXPIRED</Badge>
            }
            {props.conference.status === 'Canceled' &&
            <Badge variant="secondary" className={"px-3 py-2"} key={"0"}>CANCELED</Badge>
            }
        </td>
        {props.loggedUser === 'editor' &&
        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
            {(props.conference.status === 'Approved' || props.conference.status === 'Pending' || props.conference.status === 'Updated') &&
            <ButtonGroup>
                <Button variant={"warning"} type={"submit"}
                        onClick={() => props.edit(props.conference.id)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
                <Button variant={"danger"} type={"submit"}
                        onClick={() => props.delete(props.conference.id)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>
            </ButtonGroup>
            }
        </td>
        }
    </tr>
)

class ListAllConferenceDetailsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferences: [],
            conferenceId: '',
            loggedUser: AuthenticationService.loggedUserRole(),
            show: false
        }
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable = () => {
        axios.get('http://localhost:8080/api/conference/getAll')
            .then(response => {
                this.setState({conferences: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    conferenceList() {
        return this.state.conferences.map(currentconference => {
            return <Conference conference={currentconference} loggedUser={this.state.loggedUser}
                               edit={this.editConference} delete={this.deleteConference} key={currentconference.id}/>
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

    deleteConference = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            background: '#041c3d',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#e00404',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/api/conference/deleteConference/' + id)
                    .then(res => {
                        if (res.status === 204) {

                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                html: '<p>Your file has been deleted!</p>',
                                background: '#041c3d',
                                confirmButtonColor: '#3aa2e7',
                                iconColor: '#60e004'
                            })

                            this.refreshTable();
                        }
                    });
            }
        })


    }

    render() {

        return (
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
                        {this.state.loggedUser === 'editor' &&
                        <th className={"text-center"}>Action</th>
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
                    <Modal.Body> <UpdateConferenceDetailsComponent conferenceId={this.state.conferenceId}/>
                    </Modal.Body>
                </Modal>

                {/*--------------------------------------------------------------------------------*/}

            </div>
        )
    }

}

export default ListAllConferenceDetailsComponent;