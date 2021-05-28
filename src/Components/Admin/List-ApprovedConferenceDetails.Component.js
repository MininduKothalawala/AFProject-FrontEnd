import React, {Component} from "react";
import axios from "axios";

const Conference = props => (
    <tr>
        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.date}</td>
        <td>{props.conference.startingTime}</td>
        <td>{props.conference.endingTime}</td>
        <td>{props.conference.venue}</td>
        <td>{props.conference.status}</td>


    </tr>
)

class ListApprovedConferenceDetailsComponent extends Component{

    constructor(props) {
        super(props);

        this.state = { conferences : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/conference/approvedConference/' +this.props.match.params.status)
            .then(response => {
                this.setState({conferences: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

    }



    conferenceList(){
        return this.state.conferences.map(currentconference => {
            return <Conference conference = {currentconference} />
        })
    }



    render() {
        return(
            <div>

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Conference Name</th>
                        <th>Date</th>
                        <th>Starting Time</th>
                        <th>Ending Time</th>
                        <th>Venue</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.conferenceList()}
                    </tbody>
                </table>
            </div>
        )
    }

}
export default ListApprovedConferenceDetailsComponent;