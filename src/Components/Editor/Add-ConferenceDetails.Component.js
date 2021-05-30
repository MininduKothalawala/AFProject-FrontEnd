import {Component} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

class AddConferenceDetailsComponent extends Component{

    constructor(props){
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeConferenceName = this.onChangeConferenceName.bind(this);
        this.onChangeConferenceDesc = this.onChangeConferenceDesc.bind(this);
        this.onChangeConferenceDate = this.onChangeConferenceDate.bind(this);
        this.onChangeStartingTime = this.onChangeStartingTime.bind(this);
        this.onChangeEndingTime = this.onChangeEndingTime.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);

        this.state = {
            id : '',
            conferenceName : '',
            description:'',
            date : '',
            startingTime : '',
            endingTime: '',
            venue : '',
            status :'Pending'  //initial state is 'pending'


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

    onChangeConferenceDesc(e){
        this.setState({
            description : e.target.value
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

    onSubmit2(e){
        e.preventDefault();

        const conferences = {
            id: this.state.id,
            conferenceName: this.state.conferenceName,
            description: this.state.description,
            date: this.state.date,
            startingTime: this.state.startingTime,
            endingTime: this.state.endingTime,
            venue: this.state.venue,
            status: this.state.status,
        }

        console.log(conferences);

        axios.post('http://localhost:8080/api/conference/addConference', conferences)
            .then(res => console.log(res.data));
        alert("Form is submitted successfully")

        window.location = '/conferenceList';

    }

    render(){
        return(
            <div className={"container"}>
                <form onSubmit = {this.onSubmit2}>
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
                        <label>Description : </label>
                        <textarea
                               required
                               className = "form-control"
                               value = {this.state.description}
                               onChange = {this.onChangeConferenceDesc}
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

                    {/*<div className = "form-group">*/}
                    {/*    <label>Status : </label>*/}
                    {/*    <input type = "text"*/}
                    {/*           required*/}
                    {/*           className = "form-control"*/}
                    {/*           value = {this.state.status}*/}
                    {/*           onChange = {this.onChangeStatus}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className = "form-group">
                        <Button type={"submit"}>Add Conference</Button>
                    </div>
                </form>
            </div>
        )
    }
}
export default  AddConferenceDetailsComponent;