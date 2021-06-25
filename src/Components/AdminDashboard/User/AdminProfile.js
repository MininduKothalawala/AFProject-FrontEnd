import React, {Component} from "react";
import AthenticationDataService from "../../Login/AuthenticationDataService";
import AuthenticationService from "../../Login/AuthenticationService";
import "./AdminProfile.css";

class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }

    }
    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        let username = AuthenticationService.loggedUserName();

        AthenticationDataService.getUser(username)
            .then( res => {
                console.log(res.data)
                this.setState({
                    userData: res.data
                })
            })
    }

    render() {
        const role = AuthenticationService.loggedUserRole();

        return (
            <div className={"text-center"}>

                {/*--------------------------------UserRole Badge--------------------------------*/}
                <div className={"outer-div"}>
                    { role === 'admin' &&
                        <div className={"role-badge admin-badge"}>A</div>
                    }

                    { role === 'editor' &&
                        <div className={"role-badge reviewer-badge"}>E</div>
                    }

                    { role === 'reviewer' &&
                        <div className={"role-badge"}>R</div>
                    }
                    <div className={"role-title"}>{role}</div>
                    <div className={"text-muted"}><h6>SLIIT ICAF</h6></div>
                </div>

                <div className={"text-left details-div"}>
                    <div className={"item-div"}><b>{this.state.userData.name}</b></div>
                    <div className={"item-div"}>{this.state.userData.email}</div>
                    <div className={"item-div"}>{this.state.userData.mobileNo}</div>
                </div>

            </div>
        );

    }

}


export default MyAccount;