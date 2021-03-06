import React, {Component} from "react";
import {Accordion, Button, Card, Container, Form} from "react-bootstrap";
import * as Swal from "sweetalert2";
import TemplatesDataService from "./TemplatesDataService";
import './Templates.css';
import AuthenticationService from "../../Login/AuthenticationService";


class EditTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.tempId,
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
        const loggedUser = AuthenticationService.loggedUserName();
        this.setState({
            username: loggedUser
        });

        const id = this.state.id
        console.log(id)
        console.log(this.state.id)

        //load data to the form to update
            TemplatesDataService.getTemplate(id)
                .then( res => {
                    console.log(res)

                    if (res.status === 200) {
                        this.setState({
                            tempDesc: res.data.tempDesc,
                            tempType: res.data.tempType
                        })
                    }
                })


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

    handleUpdate = (e) => {
        e.preventDefault();

        const id = this.state.id;
        const desc = this.state.tempDesc;
        const type = this.state.tempType;
        const addedBy = this.state.username;
        const tempImg = this.state.imgFile;
        const tempFile = this.state.tempFile;


        //update only description
        if (!this.state.isChecked) {
            console.log("UPDATING...");

            const formData = new FormData();
            formData.append('id', id)
            formData.append('desc', desc)
            formData.append('addedBy', addedBy)

            TemplatesDataService.editDescription(formData)
                .then( res => {
                    if (res.status === 200) {
                        console.log("UPDATED");

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            html: '<p>Your file has been uploaded!!</p>',
                            background: '#041c3d',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#60e004'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.clearData();
                                this.props.history.push('/admin')
                            }
                        })
                    }
                })

        } else {
            //update all including files
            console.log("UPDATING FILE...");
            if (type !== 'choose') {
                const formData = new FormData();
                formData.append('id', id)
                formData.append('desc', desc)
                formData.append('type', type)
                formData.append('addedBy', addedBy)
                formData.append('tempImg', tempImg[0])
                formData.append('tempFile', tempFile[0])
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

                TemplatesDataService.editTemplate(formData, config)
                    .then(res => {
                        console.log(res);

                        if (res.status === 200) {

                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                html: '<p>Your file has been uploaded!!</p>',
                                background: '#041c3d',
                                confirmButtonColor: '#3aa2e7',
                                iconColor: '#60e004'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.clearData();
                                    window.location.reload();
                                }
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                html: '<p>There was an error updating!</p>',
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

    }

    clearData = () => {
        this.setState({
            id: '',
            tempDesc: '',
            tempType: 'choose',
            tempFile: undefined,
        })
    }

    render() {
        const {tempDesc, tempType, isChecked} = this.state;

            return (
                    <Card style={{border:'none'}}>
                        <Card.Body>
                            <Form onSubmit={this.handleUpdate}>
                                <Form.Group controlId={"templateDesc"}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as={"textarea"} name={"tempDesc"} placeholder={"Enter desc"} required
                                                  value={tempDesc} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group controlId="togglebutton">
                                    <Form.Switch type="switch" name={"isChecked"} label="Update file" onChange={this.handleToggle} />
                                </Form.Group>

                                {
                                    isChecked ?
                                    <>
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
                                    </>  :''
                                }

                                <div className={"my-4"} key={"0"}>
                                    <Button variant="primary" type={"submit"}>Save</Button>
                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
            )


    }
}

export default EditTemplates;