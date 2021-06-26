import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Card, Form, InputGroup, Modal, Table} from "react-bootstrap";
import TemplatesDataService from "./TemplatesDataService";
import Swal from "sweetalert2";
import {
    faArrowAltCircleDown,
    faEdit,
    faFilter, faSearch, faTimes,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditTemplates from "./EditTemplates";

export default class TemplateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            template: [],
            search: '',
            type: '',
            tempId: '',
            show: false,
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        TemplatesDataService.getAllTemplates()
            .then(res => {
                console.log(res.data)

                this.setState({
                    template: res.data
                })
            })
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdate = (tempId) => {
        this.setState({tempId: tempId})
        this.handleShow()
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleDelete = (id, fileId) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            background: '#041c3d',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#e00404',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                TemplatesDataService.deleteTemplate(id, fileId)
                    .then(res => {

                        if (res.status === 200) {
                            console.log("CREATED");

                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                html: '<p>Your file has been deleted!</p>',
                                background: '#041c3d',
                                confirmButtonColor: '#3aa2e7',
                                iconColor: '#60e004'
                            })

                            this.refreshList();
                        }
                        console.log(res)
                    })
            }
        })


    }

    handleDownload = (e, filename, fid) => {
        e.preventDefault();

        TemplatesDataService.downloadFile(fid)
            .then(res => {
                console.log(res)
                const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
    }

    //search by added user
    handleSearch = (e, username) => {
        e.preventDefault();

        if (username !== '') {
            TemplatesDataService.searchByAddedUser(username)
                .then(res => {
                    if (res.data.length > 0) {
                        this.setState({template: res.data})
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Not Found',
                            html: '<p>Please enter a valid username!</p>',
                            background: '#041c3d',
                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#e00404'
                        })
                        this.clearData();
                    }
                })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                html: '<p>Search field cannot be empty!</p>',
                background: '#041c3d',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        }

    }

    //filter by type
    handleFilter = (e) => {
        e.preventDefault();

        const type = this.state.type;

        console.log(type)

        if (type === 'choose') {
            this.refreshList();
        } else {
            TemplatesDataService.filterByType(type)
                .then(res => {
                    if (res.status === 200) {
                        // console.log(res);
                        this.setState({template: res.data})
                    }
                })
        }
    }

    clearData = () => {
        this.setState({
            search: '',
            type: ''
        })
        this.refreshList();
    }

    render() {
        const {template, search, type} = this.state;

        return (
            <div>
                <Card style={{border: 'none'}}>

                    {/*-------------------------------------------Search and Filter-------------------------------------------*/}
                    <Card className={"mb-5"}>
                        <Card.Body>
                            <Form inline className={"outer-group"}>
                                <div>
                                    <InputGroup>
                                        <Form.Control type={"text"} name={"search"} placeholder={"Search by username"}
                                                      className={"form-control"} value={search}
                                                      onChange={this.handleChange} onClick={this.clearData}/>
                                        <InputGroup.Append>
                                            <Button variant={"dark"} type={"submit"}
                                                    onClick={(e) => this.handleSearch(e, search)}>
                                                <FontAwesomeIcon icon={faSearch}/>
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>

                                <div>
                                    <InputGroup>
                                        <Form.Control as={"select"} name={"type"}
                                                      value={type} onChange={this.handleChange}>
                                            <option value={"choose"}>Filter by Type</option>
                                            <option value={"research"}>Research Paper Template</option>
                                            <option value={"powerpoint"}>Powerpoint Template</option>
                                            <option value={"workshop"}>Workshop Proposal Template</option>
                                        </Form.Control>
                                        <InputGroup.Append>
                                            <ButtonGroup>
                                                <Button variant="info" style={{width: '40px'}}
                                                        onClick={this.handleFilter}>
                                                    <FontAwesomeIcon icon={faFilter}/>
                                                </Button>
                                                <Button variant="danger" style={{width: '40px'}}
                                                        onClick={this.clearData}>
                                                    <FontAwesomeIcon icon={faTimes}/>
                                                </Button>
                                            </ButtonGroup>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/*-------------------------------------------Templates Table-------------------------------------------*/}

                    <Table striped responsive hover bordered>
                        <thead>
                        <tr>
                            <th className={"text-center"}>Template Type</th>
                            <th className={"text-center"}>Filename</th>
                            <th className={"text-center"}>Description</th>
                            <th className={"text-center"}>Added By</th>
                            <th className={"text-center"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            template.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"5"}>No records at the moment</td>
                                </tr>

                                : [
                                    template.map(temp =>
                                        <tr key={temp.id}>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                {
                                                    temp.tempType === 'powerpoint' ?
                                                        <Badge variant="warning" className={"px-3 py-2"}
                                                               key={"0"}>PRESENTATION</Badge>
                                                        : [
                                                            temp.tempType === 'research' ?
                                                                <Badge variant="success" className={"px-3 py-2"}
                                                                       key={"0"}>RESEARCH</Badge>
                                                                : [
                                                                    temp.tempType === 'workshop' ?
                                                                        <Badge variant="primary" className={"px-3 py-2"}
                                                                               key={"0"}>PROPOSOL</Badge> : ''
                                                                ]
                                                        ]
                                                }
                                            </td>
                                            <td>{temp.filename}</td>
                                            <td>{temp.tempDesc}</td>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}><Badge
                                                variant="dark" className={"px-3 py-2"}>{temp.username}</Badge></td>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} type={"submit"}
                                                            onClick={(e) => this.handleDownload(e, temp.filename, temp.tempFileId)}>
                                                        <FontAwesomeIcon icon={faArrowAltCircleDown}/>
                                                    </Button>
                                                    <Button variant={"warning"} type={"submit"}
                                                            onClick={() => this.handleUpdate(temp.id)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Button>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={() => this.handleDelete(temp.id, temp.tempFileId)}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>
                </Card>

                {/*--------------------------Model Box to Edit Template--------------------------*/}

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <EditTemplates tempId={this.state.tempId} /> </Modal.Body>
                </Modal>

                {/*--------------------------------------------------------------------------------*/}
            </div>
        )
    }
}