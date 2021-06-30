import React, {Component} from "react";
import "./ConferenceMain.css"
import Header from "../../Header-Footer/Header";
import PaperSubmissionList from "./PaperSubmissionList";
import ProposalSubmissionList from "./ProposalSubmissionList";
import axios from "axios";

class ConferenceSubmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conferenceID: this.props.match.params.id,
            papers: [],
            proposals: [],
        }
    }

    componentDidMount() {
        console.log(this.state.conferenceID)
        // this.loadResearchPapers();
        this.loadWorkshopProposals();
    }

    // loadResearchPapers = () => {
    //     axios.get('http://localhost:8080/api/researcher/search/conference/'+this.state.conferenceID)
    //         .then( res => {
    //             console.log(res.data)
    //             this.setState({
    //                 papers: res.data
    //             })
    //         })
    // }

    loadWorkshopProposals = () => {
        axios.get('http://localhost:8080/api/conductor/search/conference/'+this.state.conferenceID)
            .then( res => {
                console.log(res.data)
                this.setState({
                    proposals: res.data
                })
            })
    }

    render() {

        return (
            <div>
                <Header/>

                <div className={"submission-div"}>
                    <div className={"submission-inner-div"}>
                        <PaperSubmissionList conferenceID={this.state.conferenceID}/>
                    </div>
                    <div className={"submission-inner-div"}>
                        <ProposalSubmissionList conferenceID={this.state.conferenceID}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default ConferenceSubmissions;
