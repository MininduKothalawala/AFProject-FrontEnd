import React, {Component} from "react";
import axios from "axios";
import AuthenticationService from "../../Login/AuthenticationService";
import {Badge, Button, Table} from "react-bootstrap";
import Swal from "sweetalert2";

const Conference = props => (
    <tr>
        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.startingDate}</td>
        <td>{props.conference.endingDate}</td>
        <td>{props.conference.venue}</td>
        <td style={{verticalAlign: 'middle'}}>
            <Badge variant="success" className={"px-3 py-2"} >APPROVED</Badge>
        </td>
        { props.loggedUser === 'admin' &&
        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
            { props.conference.status === 'Approved' &&

            <Button variant={"secondary"} type={"submit"} style={{fontWeight: '400'}}
                    onClick={() => props.cancel(props.conference.id, props.conference.conferenceName)}>Cancel</Button>
            }
        </td>
        }
    </tr>
)

class ListApprovedConferenceDetailsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferences : [],
            loggedUser: AuthenticationService.loggedUserRole()
        }
    }

    componentDidMount() {
        this.refreshApprovedList();
    }

    refreshApprovedList = () => {
        axios.get('http://localhost:8080/api/conference/approvedConference/Approved')
            .then(response => {
                this.setState({conferences: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    conferenceList(){
        return this.state.conferences.map(currentconference => {
            return <Conference conference = {currentconference} cancel={this.cancel} loggedUser={this.state.loggedUser} key={currentconference.id} />
        })
    }

    cancel = (cid, conferenceName) => {

        //for the email
        const id = cid;
        const mailSubject = "Cancelled Conference Notification" ;
        const mailBody = "Dear Participant,\n\n" +
            "We regret to inform you that the following conference " +
            "\"" + conferenceName + "\" " + " has been cancelled by due to an unavoidable reason.\n\n" +
            "Your payments will be refund withing 2-3 business days.\n" +
            "Regards,\n" +
            "ICAF Support Team";

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

                axios.put(`http://localhost:8080/api/conference/updateStatus/${id}/Canceled`)
                    .then(res => {
                        console.log(res)
                        if (res.status === 200) {

                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                html: '<p>Conference marked as cancel!!</p>',
                                background: '#041c3d',
                                confirmButtonColor: '#3aa2e7',
                                iconColor: '#60e004'
                            })
                            this.refreshApprovedList();

                            //send email
                            // axios.post(`http://localhost:8080/api/sendEmails/Emails/${id}/${mailSubject}/${mailBody}`)
                            //         .then(res => (console.log(res)))


                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                html: '<p>Unable to cancel the conference!</p>',
                                background: '#041c3d',
                                showConfirmButton: false,
                                timer: 1500,
                                iconColor: '#e00404'
                            })
                        }
                    });

            }
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
                        {this.state.loggedUser === 'admin' &&
                        <th className={"text-center"}>Cancel</th>
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
export default ListApprovedConferenceDetailsComponent;