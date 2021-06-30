import React, {Component} from "react";
import {withRouter} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../../AdminDashboard/AdminNav.css';
import AuthenticationService from "../../Login/AuthenticationService";
import {Badge, Button, ButtonGroup, Form, InputGroup, Table} from "react-bootstrap";
import ReviewDataService from "./ReviewDataService";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import TemplatesDataService from "../Templates/TemplatesDataService";
import Swal from "sweetalert2";
import "./Review.css"

class AllResearchPapers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            papers: [],
            search:''
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        ReviewDataService.getResearPapers()
            .then( res => {
                console.log(res.data)

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

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //search by conference id
    searchByConferenceID = (e, search) => {
        e.preventDefault();

        if (search !== '') {
            ReviewDataService.searchPapersByConferenceId(search)
                .then(res => {
                    if (res.data.length > 0) {
                        this.setState({papers: res.data})
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Not Found',
                            html: '<p>Please enter a valid Conference ID!</p>',
                            background: '#041c3d',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#e00404'
                        })
                        this.clearData();
                    }
                })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                html: '<p>Search field cannot be empty!</p>',
                background: '#041c3d',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        }

    }

    //filter by submission type
    filterByType = (type) => {
        ReviewDataService.filterPapersBySubmissionStatus(type)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res);
                    this.setState({papers: res.data})
                }
            })
    }

    clearData = () => {
        this.setState({
            search: '',
        })
        this.refreshData();
    }

    render() {
        const {papers, search} = this.state;

        return (
            <div>
                <div className={"main-div-review"}>
                    <div>
                        <ButtonGroup className={"temp-btn-grp"}>
                            <Form className={"mr-5"}>
                                <div>
                                    <InputGroup>
                                        <Form.Control type={"text"} name={"search"} placeholder={"Search by Conference ID"}
                                                      className={"form-control"} value={search}
                                                      onChange={this.handleChange} onClick={this.clearData}/>
                                        <InputGroup.Append>
                                            <Button variant={"dark"} type={"submit"}
                                                    onClick={(e) => this.searchByConferenceID(e, search)}>
                                                <FontAwesomeIcon icon={faSearch}/>
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Form>
                            <Button variant={"outline-info"} type={"submit"} className={"temp-btn-status"}
                                    onClick={this.refreshData}>ALL SUBMISSIONS</Button>
                            <Button variant={"outline-success"} type={"submit"} className={"temp-btn-status"}
                                    onClick={() => this.filterByType("Approved")}>APPROVED</Button>
                            <Button variant={"outline-primary"} type={"submit"} className={"temp-btn-status"}
                                    onClick={() => this.filterByType("Rejected")}>REJECTED</Button>
                            <Button variant={"outline-warning"} type={"submit"} className={"temp-btn-status"}
                                    onClick={() => this.filterByType("Pending")}>PENDING</Button>
                        </ButtonGroup>
                    </div>

                    <Table striped responsive hover bordered>
                        <thead>
                        <tr>
                            <th className={"text-center"}>Name</th>
                            <th className={"text-center"}>Email</th>
                            <th className={"text-center"}>Conference ID</th>
                            <th className={"text-center"}>Status</th>
                            <th className={"text-center"}>Submission</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            papers.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"5"}>No records at the moment</td>
                                </tr>

                            : [
                                    papers.map (papers =>
                                    <tr key={papers.r_id}>
                                        <td style={{verticalAlign: 'middle'}}>{papers.r_name}</td>
                                        <td style={{verticalAlign: 'middle'}}>{papers.r_email}</td>
                                        <td style={{verticalAlign: 'middle'}}>{papers.r_conferenceId}</td>
                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                            {papers.r_submission_status === "Approved" &&
                                            <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                            }
                                            {papers.r_submission_status === "Rejected" &&
                                            <Badge variant="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
                                            }
                                            {papers.r_submission_status === "Pending" &&
                                            <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                            }
                                        </td>
                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                            <Button variant={"dark"} type={"submit"} style={{fontWeight:'500'}}
                                                    onClick={(e) => this.downloadPapers(e, papers.r_filename, papers.r_fileId)}>
                                                Download</Button>
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

export default withRouter(AllResearchPapers);