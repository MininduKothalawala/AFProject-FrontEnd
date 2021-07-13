import React, {Component} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import "./ConferenceMain.css"

class ProposalSubmissionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cid: props.conferenceID,
            proposals: []
        }
    }

    componentDidMount() {
        this.loadWorkshopProposals();
    }

    loadWorkshopProposals = () => {
        axios.get('https://icaf-backend.azurewebsites.net/api/conductor/search/conference/' + this.state.cid)
            .then(res => {
                console.log(res.data)
                this.setState({
                    proposals: res.data
                })
            })
    }

    render() {
        const {proposals} = this.state;

        return (
            <div>
                <Table striped responsive bordered>
                    <thead>
                    <tr>
                        <th className={"text-center"}>Name</th>
                        <th className={"text-center"}>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        proposals.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan={"5"}>No submissions at the moment</td>
                            </tr>

                            : [
                                proposals.map(proposals =>
                                    <tr key={proposals.c_id}>
                                        <td style={{verticalAlign: 'middle'}}>{proposals.c_name}</td>
                                        <td style={{verticalAlign: 'middle'}}>{proposals.c_email}</td>
                                    </tr>
                                )
                            ]
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ProposalSubmissionList;
