import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert";

export let getAllUsers;


class gettAllUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            User: [],
            username: '',
            name: '',
            password: '',
            email: '',
            mobile_no: '',
            role: ''
        }
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }


    getAllUsers = () => {
        axios.get('https://icaf-backend.azurewebsites.net/api/adminuser/alladmin').then(response => {
            // console.log(response.data)
            this.setState({
                User: response.data

            });

        }).catch(function (error) {
            console.log(error);
        })
    }

    deleteItem(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete('https://icaf-backend.azurewebsites.net/api/adminuser/deleteuser/' + id).then(response => {
                        console.log(response.data)
                        this.getAllUsers();
                    })
                    swal("Record has been deleted!", {
                        icon: "success",


                    });
                }
            });


    }


    render() {
        const {User} = this.state;

        return (
            <div>
                <Table bordered hover striped variant={"dark"}>
                    <thead>
                    <tr className={"tableHeaders"}>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Mobile Number</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        User.length === 0 ?
                            <tr align="center">
                                <td colSpan="6"><h6 className={"mt-3"}>No records at the moment</h6>
                                </td>
                            </tr>

                            : [
                                User.map(user => {
                                    // console.log(user)
                                    return (
                                        <tr key={user.username}>
                                            <td style={{verticalAlign: 'middle'}}>{user.username}</td>
                                            <td style={{verticalAlign: 'middle'}}>{user.name}</td>
                                            <td style={{verticalAlign: 'middle'}}>{user.email}</td>
                                            <td style={{verticalAlign: 'middle'}}>{user.mobileNo}</td>
                                            <td style={{verticalAlign: 'middle'}}>{user.role}</td>
                                            <td style={{verticalAlign: 'middle'}}>
                                                <Button variant={"danger"} type={"submit"}
                                                        onClick={this.deleteItem.bind(this, user.username)}>
                                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                                </Button>

                                            </td>
                                        </tr>
                                    )
                                })

                            ]
                    }


                    </tbody>
                </Table>
            </div>

        )


    }


}

export default withRouter(gettAllUsers);