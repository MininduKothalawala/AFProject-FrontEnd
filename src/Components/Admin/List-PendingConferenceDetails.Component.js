import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

// const Conference = props => (
//     <tr>
//         <td>{props.conference.id}</td>
//         <td>{props.conference.conferenceName}</td>
//         <td>{props.conference.date}</td>
//         <td>{props.conference.startingTime}</td>
//         <td>{props.conference.endingTime}</td>
//         <td>{props.conference.venue}</td>
//         <td>{props.conference.status}</td>
//
//     </tr>
// )

class ListPendingConferenceDetails extends Component{

    constructor(props) {
        super(props);

        this.approveConference = this.approveConference.bind(this);
        this.state = { conferences : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/conference/pendingConference/' +this.props.match.params.status)
            .then(response => {
                this.setState({conferences: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

    }



    // approveConference(id){
    //     axios.put('http://localhost:8080/api/conference/approveConference/' +this.props.match.params.id)
    //         .then(res => console.log(res.data));
    //
    // }

    // approveConference(id){


    //     axios.put('http://localhost:8080/api/conference/approveConference/' +id)
    //         .then(res => console.log(res.data));
    //     this.setState({
    //         conference : this.state.conferences.filter(el => el.id !== id)
    //     })
    // }

    // conferenceList(){
    //     return this.state.conferences.map(currentconference => {
    //         return <Conference conference = {currentconference} />
    //     })
    // }


    approveConference(id){

        const conferences = {
            id : this.state.id,
            conferenceName : this.state.conferenceName,
            description: this.state.description,
            date : this.state.date,
            startingTime : this.state.startingTime,
            endingTime : this.state.endingTime,
            venue : this.state.venue,
            status : this.setState({status : 'Approved'})
        }

        console.log(conferences);

        axios.put('http://localhost:8080/api/conference/approveConference' +id, conferences)
            .then(res => console.log(res.data));

    }



    render() {

        const {conferences} = this.state;
        return(
            <div>

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Conference Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Starting Time</th>
                        <th>Ending Time</th>
                        <th>Venue</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {conferences.map(conferences =>
                        <tr>
                            <td>{conferences.id}</td>
                            <td>{conferences.conferenceName}</td>
                            <td>{conferences.description}</td>
                            <td>{conferences.date}</td>
                            <td>{conferences.startingTime}</td>
                            <td>{conferences.endingTime}</td>
                            <td>{conferences.venue}</td>
                            <td>{conferences.status}</td>
                            <td><button onClick ={() => {this.approveConference(conferences.id)}}>Approve</button></td>
                        </tr>
                    )}
                    </tbody>

                </table>
            </div>
        )
    }
}
export default ListPendingConferenceDetails;