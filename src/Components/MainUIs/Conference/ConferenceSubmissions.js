import React, {Component} from "react";
import "./ConferenceMain.css"
import Header from "../../Header-Footer/Header";
import PaperSubmissionList from "./PaperSubmissionList";
import ProposalSubmissionList from "./ProposalSubmissionList";

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
