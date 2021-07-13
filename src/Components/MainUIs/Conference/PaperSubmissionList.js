import React, {Component} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import "./ConferenceMain.css"

class PaperSubmissionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cid: props.conferenceID,
            papers: []
        }
    }

    componentDidMount() {
        this.loadResearchPapers();
    }

    loadResearchPapers = () => {
        axios.get('http://localhost:8080/api/researcher/search/conference/' + this.state.cid)
            .then(res => {
                console.log(res.data)
                this.setState({
                    papers: res.data
                })
            })
    }

    render() {
        const {papers} = this.state;

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
                        papers.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan={"6"}>No submissions at the moment</td>
                            </tr>

                            : [
                                papers.map(papers =>
                                    <tr key={papers.r_id}>
                                        <td style={{verticalAlign: 'middle'}}>{papers.r_name}</td>
                                        <td style={{verticalAlign: 'middle'}}>{papers.r_email}</td>
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

export default PaperSubmissionList;
