import React, {Component} from "react";
import axios from "axios";
import {Container, Table} from "react-bootstrap";
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
        axios.get('https://icaf-backend.azurewebsites.net/api/researcher/search/conference/'+this.state.cid)
            .then( res => {
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
                <Container className={"mt-5"}>
                    <h5>Research Paper Submissions</h5> <br/>

                    <Table striped responsive hover bordered>
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
                                    papers.map (papers =>
                                        <tr key={papers.r_id}>
                                            <td style={{verticalAlign: 'middle'}}>{papers.r_name}</td>
                                            <td style={{verticalAlign: 'middle'}}>{papers.r_email}</td>
                                        </tr>
                                    )
                                ]
                        }
                        </tbody>

                    </Table>

                </Container>
            </div>
        )
    }
}

export default PaperSubmissionList;
