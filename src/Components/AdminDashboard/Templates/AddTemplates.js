import React, {Component} from "react";
import {Accordion, Button, Card, Container, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import TemplatesDataService from "./TemplatesDataService";
import './Templates.css';
import AuthenticationService from "../../Login/AuthenticationService";


class AddTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tempDesc: '',
            tempType: 'choose',
            imgFile: undefined,
            tempFile: undefined,
            username: '',
            isChecked: false,
            withFile: false
        }
    }

    componentDidMount() {
        const loggedUser = AuthenticationService.loggedUserId();
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

    handleImgChange = (event) => {
        event.preventDefault();

        this.setState({
            imgFile: event.target.files
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const desc = this.state.tempDesc;
        const type = this.state.tempType;
        const addedBy = this.state.username;
        const tempImg = this.state.imgFile[0];
        const tempFile = this.state.tempFile[0];

        //validate data
        if (type !== 'choose') {
                const formData = new FormData();
                formData.append('desc', desc)
                formData.append('type', type)
                formData.append('addedBy', addedBy)
                formData.append('tempImg', tempImg)
                formData.append('tempFile', tempFile)
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
                                title: 'Successful',
                                html: '<p>Your file has been uploaded!!</p>',
                                background: '#041c3d',
                                confirmButtonColor: '#3aa2e7',
                                iconColor: '#60e004'
                            })
                            this.clearData();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                html: '<p>There was an error uploading!</p>',
                                background: '#041c3d',
                                showConfirmButton: false,
                                timer: 1500,
                                iconColor: '#e00404'
                            })
                        }
                    })


        } else {
            Swal.fire({
                icon: 'warning',
                title: 'No Template Type',
                html: '<p>Please choose a template type!</p>',
                background: '#041c3d',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
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

    render() {
        const {tempDesc, tempType} = this.state;

        return (
            <div>
                <Card style={{border: 'none'}}>
                    <Card.Body className={"p-0"}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId={"templateDesc"}>
                                <Form.Label>Template Description</Form.Label>
                                <Form.Control as={"textarea"} name={"tempDesc"} placeholder={"Enter description"} required
                                              value={tempDesc} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId={"templateType"}>
                                <Form.Label>Template Type</Form.Label>
                                <Form.Control as={"select"} name={"tempType"} required
                                              value={tempType} onChange={this.handleChange}>
                                    <option value={"choose"}>Choose...</option>
                                    <option value={"research"}>Research Paper Template</option>
                                    <option value={"powerpoint"}>Powerpoint Template</option>
                                    <option value={"workshop"}>Workshop Proposal Template</option>
                                </Form.Control>
                            </Form.Group>

                            <Accordion className={"my-4"} defaultActiveKey="0">
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                        Upload Files
                                    </Accordion.Toggle>

                                    {
                                        tempType === 'research' ?

                                            <Accordion.Collapse eventKey="0" key={"0"}>
                                                <Card.Body>
                                                    <Container>
                                                        <Card.Text className={"text-muted"}>Please upload a preview of the document
                                                            here</Card.Text>
                                                        <Form.Group controlId={"imageFile"}>
                                                            <Form.File id={"imageUpload"} name={"imgFile"}
                                                                       accept={".jpg, .jpeg, .png"} required
                                                                       onChange={this.handleImgChange}
                                                            />
                                                        </Form.Group>
                                                    </Container> <hr/>
                                                    <Container>
                                                        <Card.Text className={"text-muted"}>Please upload your document
                                                            here</Card.Text>
                                                        <Form.Group controlId={"templateFile"}>
                                                            <Form.File id={"templateUpload"} name={"tempFile"}
                                                                       accept={".doc, .docx"} required
                                                                       onChange={this.handleFileChange}
                                                            />
                                                        </Form.Group>
                                                    </Container>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                            : [
                                                tempType === 'powerpoint' ?
                                                    <Accordion.Collapse eventKey="0" key={"0"}>
                                                        <Card.Body>
                                                            <Container>
                                                                <Card.Text className={"text-muted"}>Please upload a preview of the presentation
                                                                    here</Card.Text>
                                                                <Form.Group controlId={"imageFile"}>
                                                                    <Form.File id={"imageUpload"} name={"imgFile"}
                                                                               accept={".jpg, .jpeg, .png"} required
                                                                               onChange={this.handleImgChange}
                                                                    />
                                                                </Form.Group>
                                                            </Container> <hr/>
                                                            <Container>
                                                                <Card.Text className={"text-muted"}>Please upload your
                                                                    presentation here</Card.Text>
                                                                <Form.Group controlId={"templateFile"}>
                                                                    <Form.File id={"templateUpload"} name={"tempFile"}
                                                                               accept={".pptx, .ppt"} required
                                                                               onChange={this.handleFileChange}
                                                                    />
                                                                </Form.Group>
                                                            </Container>
                                                        </Card.Body>
                                                    </Accordion.Collapse>

                                                    : [
                                                        tempType === 'workshop' ?
                                                            <Accordion.Collapse eventKey="0" key={"0"}>
                                                                <Card.Body>
                                                                    <Container>
                                                                        <Card.Text className={"text-muted"}>Please upload a preview of the document
                                                                            here</Card.Text>
                                                                        <Form.Group controlId={"imageFile"}>
                                                                            <Form.File id={"imageUpload"} name={"imgFile"}
                                                                                       accept={".jpg, .jpeg, .png"} required
                                                                                       onChange={this.handleImgChange}
                                                                            />
                                                                        </Form.Group>
                                                                    </Container> <hr/>
                                                                    <Container>
                                                                        <Card.Text className={"text-muted"}>Please upload your document
                                                                            file here</Card.Text>
                                                                        <Form.Group controlId={"templateFile"}>
                                                                            <Form.File id={"templateUpload"} name={"tempFile"}
                                                                                       accept={".docx, .doc"} required
                                                                                       onChange={this.handleFileChange}
                                                                            />
                                                                        </Form.Group>
                                                                    </Container>
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
            </div>
        )

    }
}

export default AddTemplates;