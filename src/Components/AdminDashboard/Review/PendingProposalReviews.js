import React, {Component} from "react";
import {withRouter} from "react-router";
import '../../AdminDashboard/AdminNav.css';
import AuthenticationService from "../../Login/AuthenticationService";
import {Badge, Button, ButtonGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import ReviewDataService from "./ReviewDataService";

class PendingProposalReviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            proposals: []
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        ReviewDataService.filterProposalsBySubmissionStatus("Pending")
            .then( res => {
                this.setState({
                    proposals: res.data
                })
            })
    }

    downloadProposals = (e, filename, fid) => {
        e.preventDefault();

        ReviewDataService.downloadProposol(fid)
            .then(res => {
                console.log(res)
                const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
    }

    approveContent = (cid, email) => {
        //sending emails
        const mail = email;
        const mailSubject = "Paper Submission Notification" ;
        const mailBody = "Dear Participant,\n\n" +
            "Congratulations! Your proposal has been approved. We will be looking forward to your session.\n\n" +
            "Regards,\n" +
            "ICAF Support Team";


        const formData = new FormData();
        formData.append('id', cid)
        formData.append('s_status', "Approved")

        ReviewDataService.updateProposalSubmissionStatus(formData)
            .then( res => {
                console.log(res.data)
                this.refreshData();

                //notify users
                ReviewDataService.approveNotification(mail, mailSubject, mailBody)
                    .then( res => console.log(res.data))
            })
    }

    rejectContent = (cid) => {
        const formData = new FormData();
        formData.append('id', cid)
        formData.append('s_status', "Rejected")

        ReviewDataService.updateProposalSubmissionStatus(formData)
            .then( res => {
                console.log(res.data)
                this.refreshData();
            })
    }

    render() {
        const loggedUserRole = AuthenticationService.loggedUserRole();
        let loggedAsAdmin = false;
        let loggedAsReviewer = false;

        if (loggedUserRole != null && loggedUserRole === 'admin') {
            loggedAsAdmin = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'reviewer') {
            loggedAsReviewer = true;
        }

        const {proposals} = this.state;

        return (
            <div>
                <div>
                    <Table striped responsive hover bordered>
                        <thead>
                        <tr>
                            <th className={"text-center"}>Name</th>
                            <th className={"text-center"}>Email</th>
                            <th className={"text-center"}>Conference ID</th>
                            <th className={"text-center"}>Status</th>
                            <th className={"text-center"}>Submission</th>
                            <th className={"text-center"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            proposals.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>No records at the moment</td>
                                </tr>

                                : [
                                    proposals.map (proposals =>
                                        <tr key={proposals.c_id}>
                                            <td style={{verticalAlign: 'middle'}}>{proposals.c_name}</td>
                                            <td style={{verticalAlign: 'middle'}}>{proposals.c_email}</td>
                                            <td style={{verticalAlign: 'middle'}}>{proposals.c_conferenceId}</td>
                                            <td style={{verticalAlign: 'middle'}}><Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge></td>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                <Button variant={"dark"} type={"submit"} style={{fontWeight:'500'}}
                                                        onClick={(e) => this.downloadProposals(e, proposals.c_filename, proposals.c_fileId)}>
                                                    Download</Button>
                                            </td>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} type={"submit"}
                                                            onClick={() => this.approveContent(proposals.c_id, proposals.c_email)}>
                                                        <FontAwesomeIcon icon={faCheck}/>
                                                    </Button>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={() => this.rejectContent(proposals.c_id)}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>

                </div>
            </div>

        )
    }

}

export default withRouter(PendingProposalReviews);