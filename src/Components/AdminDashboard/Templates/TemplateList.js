import React, {Component} from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    Form,
    Image,
    InputGroup,
    Modal,
    OverlayTrigger,
    Table, Tooltip
} from "react-bootstrap";
import TemplatesDataService from "./TemplatesDataService";
import Swal from "sweetalert2";
import {
    faArrowAltCircleDown,
    faEdit,
    faSearch,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditTemplates from "./EditTemplates";
import "./Templates.css"

export default class TemplateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            template: [],
            search: '',
            tempId: '',
            show: false,
            url:''
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

    handleDelete = (id, imgId, fileId) => {

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
                TemplatesDataService.deleteTemplate(id, imgId, fileId)
                    .then(res => {

                        if (res.status === 204) {

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
    handleFilter = (type) => {

            TemplatesDataService.filterByType(type)
                .then(res => {
                    if (res.status === 200) {
                        // console.log(res);
                        this.setState({template: res.data})
                    }
                })

    }

    clearData = () => {
        this.setState({
            search: '',
            type: ''
        })
        this.refreshList();
    }

    render() {

        const {template, search} = this.state;

        return (
            <div className={"outer-group"}>
                <Card style={{border: 'none'}}>

                    {/*-------------------------------------------Search and Filter-------------------------------------------*/}

                    <div>
                        <ButtonGroup className={"temp-btn-grp"}>
                            <Form className={"mr-5"}>
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
                            </Form>
                            <Button variant={"outline-info"} type={"submit"} className={"temp-btn-status"}
                                    onClick={this.refreshList}>ALL TEMPLATES</Button>
                            <Button variant={"outline-success"} type={"submit"} className={"temp-btn-status"}
                                    onClick={() => this.handleFilter("research")}>RESEARCH PAPERS</Button>
                            <Button variant={"outline-primary"} type={"submit"} className={"temp-btn-status"}
                                    onClick={() => this.handleFilter("workshop")}>PROPOSALS</Button>
                            <Button variant={"outline-warning"} type={"submit"} className={"temp-btn-status"}
                                    onClick={() => this.handleFilter("powerpoint")}>PRESENTATIONS</Button>
                        </ButtonGroup>
                    </div>


                    {/*-------------------------------------------ResearchTemplates Table-------------------------------------------*/}

                    <Table striped responsive hover bordered>
                        <thead>
                        <tr>
                            <th className={"text-center"}>Template Type</th>
                            <th className={"text-center"}>Preview</th>
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
                                    <td colSpan={"6"}>No records at the moment</td>
                                </tr>

                                : [
                                    template.map(temp =>
                                        <tr key={temp.id}>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                {temp.tempType === 'powerpoint' &&
                                                <Badge variant="warning" className={"px-3 py-2"}
                                                       key={"0"}>PRESENTATION</Badge>
                                                }
                                                {temp.tempType === 'research' &&
                                                    <Badge variant="success" className={"px-3 py-2"}
                                                           key={"0"}>RESEARCH</Badge>
                                                }
                                                {temp.tempType === 'workshop' &&
                                                    <Badge variant="primary" className={"px-3 py-2"}
                                                           key={"0"}>PROPOSOL</Badge>
                                                }
                                            </td>
                                            <td className={"text-center"}>
                                                <OverlayTrigger placement={"right"} defaultShow={false} delay={{ show: 10, hide: 10 }}
                                                                overlay={
                                                    <Tooltip id="tooltip-right" bsPrefix={"template-popover"}>
                                                        <div>
                                                            <Image height={"200px"} variant={"top"}
                                                                   src={`https://icaf-backend.azurewebsites.net/templates/download/${temp.imgFileId}`} />
                                                        </div>
                                                    </Tooltip>
                                                }>
                                                    <Image variant={"top"} height={"50px"}
                                                           src={`https://icaf-backend.azurewebsites.net/templates/download/${temp.imgFileId}`} />
                                                </OverlayTrigger>
                                            </td>
                                            <td>{temp.tempFileName}</td>
                                            <td>{temp.tempDesc}</td>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                <Badge variant="dark" className={"px-3 py-2"}>{temp.addedBy}</Badge></td>
                                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} type={"submit"}
                                                            onClick={(e) => this.handleDownload(e, temp.tempFileName, temp.tempFileId)}>
                                                        <FontAwesomeIcon icon={faArrowAltCircleDown}/>
                                                    </Button>
                                                    <Button variant={"warning"} type={"submit"}
                                                            onClick={() => this.handleUpdate(temp.id)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Button>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={() => this.handleDelete(temp.id, temp.imgFileId, temp.tempFileId)}>
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


                {/*--------------------------Modal Box to Edit Template--------------------------*/}

                <Modal show={this.state.show} onHide={this.handleClose} centered>
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