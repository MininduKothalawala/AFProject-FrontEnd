import React, {Component} from "react";
import {withRouter} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../../AdminDashboard/AdminNav.css';
import AuthenticationService from "../../Login/AuthenticationService";
import {Badge, Button, ButtonGroup, Table} from "react-bootstrap";
import ReviewDataService from "./ReviewDataService";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

class PendingPaperReviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            papers: []
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        ReviewDataService.filterPapersBySubmissionStatus("Pending")
            .then( res => {
                this.setState({
                    papers: res.data
                })
            })
    }

    downloadPapers = (e, filename, fid) => {
        e.preventDefault();

        ReviewDataService.downloadPaper(fid)
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

    approveContent = (id, email) => {
        //sending emails
        const mail = email;
        const mailSubject = "Paper Submission Notification" ;
        const mailBody = "Congratulations! Your submission has been approved. Use this ID: "+ id +", to proceed with payment";


        const formData = new FormData();
        formData.append('id', id)
        formData.append('s_status', "Approved")

        ReviewDataService.updatePaperSubmissionStatus(formData)
            .then( res => {
                console.log(res.data)
                this.refreshData();

                //notify users
                ReviewDataService.approveNotification(mail, mailSubject, mailBody)
                    .then( res => console.log(res.data))
            })
    }

    rejectContent = (id, email) => {
        const mail = email;
        const mailSubject = "Paper Submission Notification" ;
        const mailBody = "Sorry! Your submission has been rejected.";

        const formData = new FormData();
        formData.append('id', id)
        formData.append('s_status', "Rejected")

        ReviewDataService.updatePaperSubmissionStatus(formData)
            .then( res => {
                console.log(res.data)
                this.refreshData();

                //notify users
                ReviewDataService.approveNotification(mail, mailSubject, mailBody)
                    .then( res => console.log(res.data))
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

        const {papers} = this.state;

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
                            papers.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>No records at the moment</td>
                                </tr>

                                : [
                                    papers.map (papers =>
                                        <tr key={papers.r_id}>
                                            <td style={{verticalAlign: 'middle'}}>{papers.r_name}</td>
                                            <td style={{verticalAlign: 'middle'}}>{papers.r_email}</td>
                                            <td style={{verticalAlign: 'middle'}}>{papers.r_conferenceId}</td>
                                            <td style={{verticalAlign: 'middle'}} className={"text-center"}><Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge></td>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                <Button variant={"dark"} type={"submit"} style={{fontWeight:'500'}}
                                                        onClick={(e) => this.downloadPapers(e, papers.r_filename, papers.r_fileId)}>
                                                    Download</Button>
                                            </td>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} type={"submit"}
                                                            onClick={() => this.approveContent(papers.r_id, papers.r_email)}>
                                                        <FontAwesomeIcon icon={faCheck}/>
                                                    </Button>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={() => this.rejectContent(papers.r_id, papers.r_email)}>
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

export default withRouter(PendingPaperReviews);