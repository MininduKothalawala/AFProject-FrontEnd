import {Component} from "react";
import axios from "axios";

class UpdateConferenceDetailsComponent extends Component{

    constructor(props){
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeConferenceName = this.onChangeConferenceName.bind(this);
        this.onChangeConferenceDate = this.onChangeConferenceDate.bind(this);
        this.onChangeEndingDate = this.onChangeEndingDate.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id : this.props.match.params.id,
            conferenceName : '',
            startingDate : '',
            endingDate: '',
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

    onChangeStartingDate(e){
        this.setState({
            startingDate : e.target.value
        });
    }
    onChangeEndingDate(e){
        this.setState({
            endingDate : e.target.value
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
            startingDate: this.state.startingDate,
            endingDate: this.state.endingDate,
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
                        <label>Starting Time : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.startingDate}
                               onChange = {this.onChangeStartingDate}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Ending Time : </label>
                        <input type = "text"
                               required
                               className = "form-control"
                               value = {this.state.endingDate}
                               onChange = {this.onChangeEndingDate}
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
