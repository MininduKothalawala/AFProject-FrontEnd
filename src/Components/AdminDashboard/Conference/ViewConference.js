import React, {Component} from "react";
import axios from "axios";

class ViewConference extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cid: props.confID,
            confName: '',
            description: '',
            startingDate: '',
            endingDate: '',
            venue: ''
        }

    }

    componentDidMount() {
        this.refresh()
    }

    refresh = () => {
        const id = this.state.cid

        axios.get(`https://icaf-backend.azurewebsites.net/api/conference/conferencebyid/${id}`)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    confName: response.data.conferenceName,
                    description: response.data.description,
                    startingDate: response.data.startingDate,
                    endingDate: response.data.endingDate,
                    venue: response.data.venue
                })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const {cid, confName, description, startingDate, endingDate, venue} = this.state

        return (
            <div>
                    <div className={"px-3 py-2"}>
                        <div>
                            <h5>Conference ID</h5>
                            <p>{cid}</p>
                        </div> <hr/>
                        <div>
                            <h5>Conference Name</h5>
                            <p>{confName}</p>
                        </div> <hr/>
                        <div>
                            <h5>Description</h5>
                            <p>{description}</p>
                        </div> <hr/>
                        <div>
                            <h5>Starting Date</h5>
                            <p>{startingDate}</p>
                        </div> <hr/>
                        <div>
                            <h5>Ending Date</h5>
                            <p>{endingDate}</p>
                        </div> <hr/>
                        <div>
                            <h5>Venue</h5>
                            <p>{venue}</p>
                        </div>
                    </div>
            </div>
        );

    }

}


export default ViewConference;