import React, {Component} from "react";
import {Accordion, Button, Card, Container, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import TemplatesDataService from "./TemplatesDataService";
import './Templates.css';


class AddTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            tempTitle: '',
            tempDesc: '',
            tempType: 'choose',
            tempFile: undefined,
            username: 'hansi123', //TODO:logged users name
        }
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
            tempFile: event.target.files,
            open: false
        })
    }

    handleValidation = (title, desc, type) => {
        let valid = true;

        if (title.length < 10) {
            valid = false;
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'There must be at least 10 characters in the title'
            })


        } else if (desc.length < 20) {
            valid = false;
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Description must be at least 20 characters long'
            })

        } else if (type === 'choose') {
            valid = false;
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Please choose a template type'
            })
        }

        return valid;
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const id = this.state.id;
        const title = this.state.tempTitle;
        const desc = this.state.tempDesc;
        const type = this.state.tempType;
        const user = this.state.username;
        const file = this.state.tempFile[0];

        //validate data
        const isValid = this.handleValidation(title, desc, type);

        if (isValid) {
            if (id === -1) {
                const formData = new FormData();
                formData.append('title', title)
                formData.append('desc', desc)
                formData.append('type', type)
                formData.append('username', user)
                formData.append('file', file)

                TemplatesDataService.addTemplate(formData)
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
                        }
                    })

            }
        }

    }

    clearData = () => {
        this.setState({
            id: -1,
            tempTitle: '',
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
        const {tempTitle, tempDesc, tempType} = this.state

        return (
            <Container>
                <Card>
                    <Card.Title>Add Template</Card.Title>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId={"templateName"}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type={"text"} name={"tempTitle"} placeholder={"Enter title"} required
                                              value={tempTitle} onChange={this.handleChange}/>
                            </Form.Group>

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
                                    <option value={"research"}>Research paper Templates</option>
                                    <option value={"powerpoint"}>Powerpoint Templates</option>
                                    <option value={"other"}>Other Templates</option>
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
                                                        tempType === 'other' ?
                                                            <Accordion.Collapse eventKey="0" key={"0"}>
                                                                <Card.Body>
                                                                    <Card.Text className={"text-muted"}>Please upload your pdf
                                                                        file here</Card.Text>
                                                                    <Form.Group controlId={"templateFile"}>
                                                                        <Form.File id={"templateUpload"} name={"tempFile"}
                                                                                   accept={".pdf"} required
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