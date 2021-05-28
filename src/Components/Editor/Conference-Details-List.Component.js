import React, {Component} from "react";
import {Button, Card, Container} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

const Conference = props => (
    <tr>
        <td>{props.conference.id}</td>
        <td>{props.conference.conferenceName}</td>
        <td>{props.conference.date}</td>
        <td>{props.conference.startingTime}</td>
        <td>{props.conference.endingTime}</td>
        <td>{props.conference.venue}</td>
        <td>{props.conference.status}</td>
        <td>
            <button ><Link to = {"/updateConference/" +props.conference._id } >Edit</Link></button> <button  onClick ={() => {props.deleteConference(props.conference.id)}}>Delete</button>
        </td>
    </tr>
)

class ConferenceDetailsListComponent extends Component{

    constructor(props) {
        super(props);

        this.deleteConference = this.deleteConference.bind(this);

        this.state = { conferences : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/conference/getAll')
            .then(response => {
                this.setState({conferences: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

    }

    deleteConference(id){
        axios.delete('http://localhost:8080/api/conference/deleteConference' +id)
            .then(res => console.log(res.data));
        this.setState({
            conferences : this.state.conferences.filter(el => el.id !== id)
        })

    }

    conferenceList(){
        return this.state.conferences.map(currentconference => {
            return <Conference conference = {currentconference} deleteConference = {this.deleteConference} key = {currentconference.id}/>
        })
    }

    // componentDidMount(){
    //     axios.get("http://localhost:8080/conferenceList/")
    //         .then((res)=>{
    //             this.setState({
    //                 conference:res.data,
    //                 id:0,
    //                 conferenceName:'',
    //                 date:'',
    //                 startingTime:'',
    //                 endingTime:'',
    //                 venue:'',
    //                 status:''
    //             })
    //         })
    // }

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
export default ConferenceDetailsListComponent;