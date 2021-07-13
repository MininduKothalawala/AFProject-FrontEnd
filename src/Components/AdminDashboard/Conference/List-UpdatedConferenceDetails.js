import React, {Component} from "react";
import axios from "axios";
import {Badge, Button, ButtonGroup, Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExternalLinkAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import ViewConference from "./ViewConference";

class ListUpdatedConferenceDetails extends Component{

    constructor(props) {
        super(props);

        this.state = {
            conferences : [],
            show: false,
            confID: ''
        }

        this.approveConference = this.approveConference.bind(this);
        this.viewConference = this.viewConference.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.rejectConference = this.rejectConference.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        axios.get('https://icaf-backend.azurewebsites.net/api/conference/editedConference/Updated')
            .then(response => {
                this.setState({conferences: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    approveConference(id){
        //for the email
        const cid = this.state.id;
        const mailSubject = "Conference Update Notification" ;
        const mailBody = "This is to inform you that there has been a change in details of the following conference" + cid;

        const conferences = {
            id : this.state.id,
            conferenceName : this.state.conferenceName,
            description: this.state.description,
            date : this.state.date,
            startingTime : this.state.startingTime,
            endingTime : this.state.endingTime,
            venue : this.state.venue,
            status : 'Approved'
        }

        console.log(conferences);

        axios.put(`https://icaf-backend.azurewebsites.net/api/conference/updateStatus/${id}/Approved`)
            .then( res => {
                console.log(res.data)
                this.refreshList()

                axios.post(`https://icaf-backend.azurewebsites.net/api/sendEmails/Emails/${id}/${mailSubject}/${mailBody}`)
                    .then(res => (console.log(res)))

            })

    }

    rejectConference(id){
        //for the email
        const cid = this.state.id;
        const mailSubject = "Conference Update Notification" ;
        const mailBody = "This is to inform you that the following conference" + cid + " has been cancelled";

        axios.put(`https://icaf-backend.azurewebsites.net/api/conference/updateStatus/${id}/Rejected`)
            .then( res => {
                console.log(res.data)
                this.refreshList()

                axios.post(`https://icaf-backend.azurewebsites.net/api/sendEmails/Emails/${id}/${mailSubject}/${mailBody}`)
                    .then(res => (console.log(res)))

            })
    }

    viewConference(id) {
        //to pass the id to another component
        this.setState({confID: id})

        this.handleShow()
    }

    //Modal box
    handleShow = () => {
        this.setState({show: true})
    }
    //Modal box
    handleClose = () => {
        this.setState({show: false})
    }

    render() {
        const {conferences} = this.state;
        return(
            <div>

                <Table responsive hover striped bordered>
                    <thead>
                    <tr>
                        <th className={"text-center"}>ID</th>
                        <th className={"text-center"}>Conference Name</th>
                        <th className={"text-center"}>View</th>
                        <th className={"text-center"}>Status</th>
                        <th className={"text-center"}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { conferences.map(conferences =>
                        <tr key={conferences.id}>
                            <td>{conferences.id}</td>
                            <td>{conferences.conferenceName}</td>
                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                <Button variant={"info"} type={"submit"} onClick={() => this.viewConference(conferences.id)}>
                                    <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                </Button>

                                {/*--------------------------Model Box to View Conference--------------------------*/}

                                <Modal show={this.state.show} onHide={this.handleClose} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Conference Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body> <ViewConference confID={this.state.confID} /> </Modal.Body>
                                </Modal>

                                {/*--------------------------------------------------------------------------------*/}

                            </td>
                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                <Badge variant="primary" className={"px-3 py-2"} >UPDATED</Badge>
                            </td>
                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                <ButtonGroup>
                                    <Button variant={"success"} type={"submit"}>
                                        <FontAwesomeIcon icon={faCheck} onClick ={() => {this.approveConference(conferences.id)}} />
                                    </Button>
                                    <Button variant={"danger"} type={"submit"}>
                                        <FontAwesomeIcon icon={faTimes} onClick ={() => {this.rejectConference(conferences.id)}} />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </Table>
            </div>
        )
    }

}
export default ListUpdatedConferenceDetails;