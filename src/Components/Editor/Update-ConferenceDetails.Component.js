import {Component} from "react";
import axios from "axios";

class UpdateConferenceDetailsComponent extends Component{

    constructor(props){
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeConferenceName = this.onChangeConferenceName.bind(this);
        this.onChangeConferenceDate = this.onChangeConferenceDate.bind(this);
        this.onChangeStartingTime = this.onChangeStartingTime.bind(this);
        this.onChangeEndingTime = this.onChangeEndingTime.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id : '',
            conferenceName : '',
            date : '',
            startingTime : '',
            endingTime: '',
            venue : '',
            status :''

        }
    }

    onChangeID(e){
        this.setState({
            id : e.target.value
        });
    }

    onChangeConferenceName(e){
        this.setState({
            conferenceName : e.target.value
        });
    }

    onChangeConferenceDate(e){
        this.setState({
            date : e.target.value
        });
    }

    onChangeStartingTime(e){
        this.setState({
            startingTime : e.target.value
        });
    }
    onChangeEndingTime(e){
        this.setState({
            endingTime : e.target.value
        });
    }
    onChangeVenue(e){
        this.setState({
            venue : e.target.value
        });
    }

    onChangeStatus(e){
        this.setState({
            status : e.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();

        const conferences = {
            id: this.state.id,
            conferenceName: this.state.conferenceName,
            date: this.state.date,
            startingTime: this.state.startingTime,
            endingTime: this.state.endingTime,
            venue: this.state.venue,
            status: this.state.status,
        }

        console.log(conferences);

        axios.put('http://localhost:8080/api/conference/updateConference',conferences)
            .then(res => console.log(res.data));


    }
    render() {
        return(
            <div>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>ID : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.id}
                               onChange = {this.onChangeID}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Name : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.conferenceName}
                               onChange = {this.onChangeConferenceName}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Date : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.date}
                               onChange = {this.onChangeConferenceDate}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Starting Time : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.startingTime}
                               onChange = {this.onChangeStartingTime}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Ending Time : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.endingTime}
                               onChange = {this.onChangeEndingTime}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Venue : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.venue}
                               onChange = {this.onChangeVenue}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Status : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.status}
                               onChange = {this.onChangeStatus}
                        />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Update Conference" />
                    </div>
                </form>
            </div>
        )
    }
}
export default UpdateConferenceDetailsComponent;
