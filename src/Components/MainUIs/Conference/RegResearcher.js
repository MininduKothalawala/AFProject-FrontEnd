import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import ConferenceRegDataService from "./ConferenceRegDataService";
import {withRouter} from "react-router-dom";

class RegResearcher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conferenceId: props.id,
            name: '',
            email: '',
            mobile: '',
            file: undefined,
            filename: 'Upload Research Paper'
        }
    }

    componentDidMount() {

    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFileChange = (event) => {
        event.preventDefault();

        this.setState({
            file: event.target.files,
            filename: event.target.files[0].name
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const confId = this.state.conferenceId;
        const name = this.state.name;
        const mail = this.state.email;
        const mobile = this.state.mobile;
        const file = this.state.file[0];

                const formData = new FormData();
                formData.append('c_id', confId)
                formData.append('name', name)
                formData.append('mail', mail)
                formData.append('mobile', mobile)
                formData.append('file', file)
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

                ConferenceRegDataService.regAsResearcher(formData, config)
                    .then(res => {
                        console.log(formData);
                        console.log(res);

                        if (res.status === 201) {
                            console.log("CREATED");

                            Swal.fire({
                                icon: 'success',
                                title: 'SUCCESS',
                                html: '<p>Your have successfully registered!</p>',
                                background: '#041c3d',
                                showConfirmButton: false,
                                iconColor: '#58b7ff',
                                timer: 1500
                            });

                            this.props.history.push("/");
                        }
                    })
            }

    render() {
        const {name, email, mobile, filename} = this.state;

        return (
            <Card>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId={"regName"}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type={"text"} name={"name"} placeholder={"Enter name"} required
                                          value={name} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId={"regEmail"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type={"email"} name={"email"} placeholder={"Enter email"}
                                          required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                          value={email} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId={"regMobile"}>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type={"text"} name={"mobile"} placeholder={"Enter mobile number"}
                                          required maxLength={10} pattern="[0-9]{10}"
                                          value={mobile} onChange={this.handleChange}/>
                        </Form.Group>

                        <hr className={"my-5"}/>

                        <Form.Group controlId={"regFile"} >

                            <Form.File id={"fileUpload"} name={"file"} custom label={filename}
                                       accept={".docx, .doc, .pdf"} required
                                       onChange={this.handleFileChange} />
                            <Form.Text className="text-muted">
                                <i>Note: You cannot change once it is uploaded.</i>
                            </Form.Text>
                        </Form.Group>

                        <div className={"my-4"}>
                            <Button variant="primary" className={"mr-3"} type={"submit"}>Submit</Button>
                        </div>


                    </Form>
                </Card.Body>
            </Card>
        )
    }

}

export default withRouter(RegResearcher);