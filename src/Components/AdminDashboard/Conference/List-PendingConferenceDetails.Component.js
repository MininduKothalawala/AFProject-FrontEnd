import React, {Component} from "react";
import axios from "axios";
import {Badge, Button, ButtonGroup, Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExternalLinkAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import ViewConference from "./ViewConference";

// const Conference = props => (
//     <tr>
//         <td>{props.conference.id}</td>
//         <td>{props.conference.conferenceName}</td>
//         <td>{props.conference.date}</td>
//         <td>{props.conference.startingTime}</td>
//         <td>{props.conference.endingTime}</td>
//         <td>{props.conference.venue}</td>
//         <td>{props.conference.status}</td>
//
//     </tr>
// )

class ListPendingConferenceDetails extends Component{

    constructor(props) {
        super(props);
        this.approveConference = this.approveConference.bind(this);
        this.viewConference = this.viewConference.bind(this);
        this.state = {
            conferences : [],
            show: false,
            confID: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/conference/pendingConference/Pending')
            .then(response => {
                this.setState({conferences: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // approveConference(id){
    //     axios.put('http://localhost:8080/api/conference/approveConference/' +this.props.match.params.id)
    //         .then(res => console.log(res.data));
    //
    // }

    // approveConference(id){


    //     axios.put('http://localhost:8080/api/conference/approveConference/' +id)
    //         .then(res => console.log(res.data));
    //     this.setState({
    //         conference : this.state.conferences.filter(el => el.id !== id)
    //     })
    // }

    // conferenceList(){
    //     return this.state.conferences.map(currentconference => {
    //         return <Conference conference = {currentconference} />
    //     })
    // }


    approveConference(id){

        const conferences = {
            id : this.state.id,
            conferenceName : this.state.conferenceName,
            description: this.state.description,
            date : this.state.date,
            startingTime : this.state.startingTime,
            endingTime : this.state.endingTime,
            venue : this.state.venue,
            status : this.setState({status : 'Approved'})
        }

        console.log(conferences);

        axios.put('http://localhost:8080/api/conference/approveConference' +id, conferences)
            .then(res => console.log(res.data));

    }

    viewConference(id) {
        //to pass the id to another component
        this.setState({confID: id})

        // console.log(this.state.confID)
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
                            {/*<th className={"text-center"}>Description</th>*/}
                            {/*<th className={"text-center"}>Starting Date</th>*/}
                            {/*<th className={"text-center"}>Ending Date</th>*/}
                            {/*<th className={"text-center"}>Venue</th>*/}
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
                                {/*<td>{conferences.description}</td>*/}
                                {/*<td>{conferences.startingDate}</td>*/}
                                {/*<td>{conferences.endingDate}</td>*/}
                                {/*<td>{conferences.venue}</td>*/}
                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                    <Button variant={"info"} type={"submit"} onClick={() => this.viewConference(conferences.id)}>
                                        <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                    </Button>

                                    {/*--------------------------Model Box to View Conference--------------------------*/}

                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Conference Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body> <ViewConference confID={this.state.confID} /> </Modal.Body>
                                    </Modal>

                                    {/*--------------------------------------------------------------------------------*/}

                                </td>
                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                    <Badge variant="warning" className={"px-3 py-2"} >PENDING</Badge>
                                </td>
                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                    <ButtonGroup>
                                        <Button variant={"success"} type={"submit"}>
                                            <FontAwesomeIcon icon={faCheck} onClick ={() => {this.approveConference(conferences.id)}} />
                                        </Button>
                                        <Button variant={"danger"} type={"submit"}>
                                            <FontAwesomeIcon icon={faTimes}/>
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
export default ListPendingConferenceDetails;