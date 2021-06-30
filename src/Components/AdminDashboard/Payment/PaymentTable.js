import React, {Component} from "react";
import {withRouter} from "react-router";
import '../../AdminDashboard/AdminNav.css';
import AuthenticationService from "../../Login/AuthenticationService";
import {Badge, Button, ButtonGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

class PaymentTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: []
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        // ReviewDataService.getProposols()
        //     .then( res => {
        //         console.log(res.data)
        //
        //         this.setState({
        //             proposals: res.data
        //         })
        //     })
    }


    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUser = AuthenticationService.loggedUserName();

        const {payment} = this.state;

        return (
            <div>
                <div>
                    <Table striped responsive hover bordered>
                        <thead>
                        <tr>
                            <th className={"text-center"}>Name</th>
                            <th className={"text-center"}>Email</th>
                            <th className={"text-center"}>Conference ID</th>
                            <th className={"text-center"}>Submission</th>
                            {/*<th className={"text-center"}>Status</th>*/}
                            <th className={"text-center"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            payment.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"5"}>No records at the moment</td>
                                </tr> :''

                                // : [
                                //     proposals.map (proposals =>
                                //         <tr key={proposals.c_id}>
                                //             <td>{proposals.c_name}</td>
                                //             <td>{proposals.c_email}</td>
                                //             <td>{proposals.c_conferenceId}</td>
                                //             <td>
                                //                 <Button variant={"dark"} className={"px-2"} type={"submit"}
                                //                         onClick={(e) => this.downloadProposals(e, proposals.c_filename, proposals.c_fileId)}>Download</Button>
                                //             </td>
                                //
                                //             <td className={"text-center"} style={{verticalAlign:'middle'}}>
                                //                 <ButtonGroup>
                                //                     <Button variant={"warning"} type={"submit"}
                                //                             onClick={() => this.handleStatus(proposals.c_id, "Approved")}>
                                //                         <FontAwesomeIcon icon={faCheck}/>
                                //                     </Button>
                                //                     <Button variant={"danger"} type={"submit"}
                                //                             onClick={() => this.handleStatus(proposals.c_id, "Rejected")}>
                                //                         <FontAwesomeIcon icon={faTimes}/>
                                //                     </Button>
                                //
                                //                 </ButtonGroup>
                                //             </td>
                                //         </tr>
                                //     )
                                // ]
                        }
                        </tbody>
                    </Table>

                </div>
            </div>

        )
    }

}

export default withRouter(PaymentTable);