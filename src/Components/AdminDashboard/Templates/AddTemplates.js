import React, {Component} from "react";
import {Accordion, Button, Card, Container, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import TemplatesDataService from "./TemplatesDataService";
import './Templates.css';
import AuthenticationService from "../../Authentication/AuthenticationService";


class AddTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tempDesc: '',
            tempType: 'choose',
            tempFile: undefined,
            username: '',
            isChecked: false,
            withFile: false
        }
    }

    componentDidMount() {
        const loggedUser = AuthenticationService.loggedUserName();
        this.setState({
            username: loggedUser
        });
            }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleToggle = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })

        console.log(this.state.isChecked)
    }

    handleFileChange = (event) => {
        event.preventDefault();

        this.setState({
            tempFile: event.target.files
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const desc = this.state.tempDesc;
        const type = this.state.tempType;
        const user = this.state.username;
        const file = this.state.tempFile[0];

        //validate data
        if (type !== 'choose') {
                const formData = new FormData();
                formData.append('desc', desc)
                formData.append('type', type)
                formData.append('username', user)
                formData.append('file', file)
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

                TemplatesDataService.addTemplate(formData, config)
                    .then(res => {
                        console.log(formData);
                        console.log(res);

                        if (res.status === 201) {
                            console.log("CREATED");

                            Swal.fire({
                                icon: 'success',
                                title: 'SUCCESS',
                                text: 'Your file has been uploaded!',
                                timer: 1500
                            })
                            this.clearData();
                            this.props.history.push('/admin-template/list')
                        }
                    })


        } else {
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Please choose a template type'
            })
        }


    }

    clearData = () => {
        this.setState({
            id: -1,
            tempDesc: '',
            tempType: 'choose',
            tempFile: undefined,
        })
    }

    testButton = () => {
        Swal.fire({
            icon: 'success',
            title: 'Successful',
            html: '<p>Your file has been uploaded!</p>',
            background: '#041c3d',
            confirmButtonColor: '#3aa2e7',
            iconColor: '#58b7ff'
        })
    }

    render() {
        const {tempDesc, tempType} = this.state;

        return (
            <Container>
                <Card>
                    <Card.Title>Add Template</Card.Title>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId={"templateDesc"}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as={"textarea"} name={"tempDesc"} placeholder={"Enter desc"} required
                                              value={tempDesc} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"templateType"}>
                                <Form.Label>Type</Form.Label>
                                <Form.Control as={"select"} name={"tempType"} required
                                              value={tempType} onChange={this.handleChange}>
                                    <option value={"choose"}>Choose...</option>
                                    <option value={"research"}>Research paper Template</option>
                                    <option value={"powerpoint"}>Powerpoint Template</option>
                                    <option value={"workshop"}>Workshop Proposal Template</option>
                                </Form.Control>
                            </Form.Group>

                            <Accordion className={"my-4"} defaultActiveKey="0">
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                        Upload
                                    </Accordion.Toggle>

                                    {
                                        tempType === 'research' ?

                                            <Accordion.Collapse eventKey="0" key={"0"}>
                                                <Card.Body>
                                                    <Card.Text className={"text-muted"}>Please upload your document
                                                        here</Card.Text>
                                                    <Form.Group controlId={"templateFile"}>
                                                        <Form.File id={"templateUpload"} name={"tempFile"}
                                                                   accept={".doc, .docx"} required
                                                                   onChange={this.handleFileChange}
                                                        />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                            : [
                                                tempType === 'powerpoint' ?
                                                    <Accordion.Collapse eventKey="0" key={"0"}>
                                                        <Card.Body>
                                                            <Card.Text className={"text-muted"}>Please upload your
                                                                presentation here</Card.Text>
                                                            <Form.Group controlId={"templateFile"}>
                                                                <Form.File id={"templateUpload"} name={"tempFile"}
                                                                           accept={".pptx, .ppt"} required
                                                                           onChange={this.handleFileChange}
                                                                />
                                                            </Form.Group>
                                                        </Card.Body>
                                                    </Accordion.Collapse>

                                                    : [
                                                        tempType === 'workshop' ?
                                                            <Accordion.Collapse eventKey="0" key={"0"}>
                                                                <Card.Body>
                                                                    <Card.Text className={"text-muted"}>Please upload your document
                                                                        file here</Card.Text>
                                                                    <Form.Group controlId={"templateFile"}>
                                                                        <Form.File id={"templateUpload"} name={"tempFile"}
                                                                                   accept={".docx, .doc"} required
                                                                                   onChange={this.handleFileChange}
                                                                        />
                                                                    </Form.Group>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                            : ''
                                                    ]

                                            ]
                                    }
                                </Card>
                            </Accordion>

                            <div className={"my-4"}>
                                <Button variant="primary" type={"submit"}>Submit</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                {/*TODO: this button is for testing SweetAlert. DELETE Later!*/}
                <Button variant="primary" type={"submit"} onClick={this.testButton}>SWAL</Button>
            </Container>
        )

    }
}

export default AddTemplates;