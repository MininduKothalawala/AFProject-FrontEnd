import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Card, Form, Table} from "react-bootstrap";
import TemplatesDataService from "./TemplatesDataService";
import Swal from "sweetalert2";

export default class TemplateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            template: [],
            search:'',
            type:''
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        TemplatesDataService.getAllTemplates()
            .then( res => {
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
        this.props.history.push(`/admin-template/add/${tempId}`)
        console.log("UPDATE")
    }

    handleDelete = (id, fileId) => {
        TemplatesDataService.deleteTemplate(id, fileId)
            .then( res => {

                if (res.status === 200) {
                    console.log("CREATED");

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Your file has been deleted!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#58b7ff'
                    })

                    this.refreshList();
                }
                console.log(res)
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
                .then( res => {
                    console.log(res.data)
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'error',
                html: '<p>Your file has been uploaded!</p>',
                background: '#363640',
                confirmButtonColor: '#ff6969',
                iconColor: '#e00404'
            })
        }

    }

    //filter by type
    handleFilter = (e) => {
        e.preventDefault();

        const type =this.state.type;

        console.log(type)

        if (type === 'choose') {
            this.refreshList();
        } else {
            TemplatesDataService.filterByType(type)
                .then( res => {
                    if (res.status === 200) {
                        console.log(res);
                        this.setState({template: res.data})
                    }
                })
        }
    }

    clearData = () => {
        if (this.state.search !== '') {
            this.setState({
                search: '',
                type: ''
            })
            this.refreshList();
        }

        console.log(this.state.id)
    }

    render() {
        const {template, search, type} = this.state;

        return (
            <div className={"m-3"}>
                <Card>
                    <Form inline style={{float:'right'}} >
                        <Form.Group controlId={"templateType"} className={"mr-5"}>
                            <Form.Control as={"select"} name={"type"}
                                          value={type} onChange={this.handleChange}>
                                <option value={"choose"}>Filter by Type</option>
                                <option value={"research"}>Research paper Template</option>
                                <option value={"powerpoint"}>Powerpoint Template</option>
                                <option value={"workshop"}>Workshop Proposal Template</option>
                            </Form.Control>
                            <ButtonGroup>
                                <Button variant={"dark"} type={"submit"} className={"px-3"}
                                        onClick={this.handleFilter}>@</Button>
                                <Button variant={"secondary"} type={"submit"} className={"px-3"}
                                        onClick={this.clearData}>X</Button>
                            </ButtonGroup>


                        </Form.Group>

                        <Form.Group controlId={"templateSearch"} className={"ml-5"}>
                            <input type={"text"} name="search" placeholder={"Search"} className={"form-control"} value={search}
                                   onChange={this.handleChange} onClick={this.clearData}/>
                            <Button variant={"dark"} type={"submit"}
                                    onClick={(e) => this.handleSearch(e, search)}>OK</Button>
                        </Form.Group>

                    </Form>

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
                                    template.map (temp =>
                                        <tr key={temp.id}>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}>
                                                {
                                                    temp.tempType === 'powerpoint' ?
                                                        <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PRESENTATION</Badge>
                                                        : [
                                                            temp.tempType === 'research' ?
                                                                <Badge variant="success" className={"px-3 py-2"} key={"0"}>RESEARCH</Badge>
                                                                : [
                                                                    temp.tempType === 'workshop' ?
                                                                        <Badge variant="primary" className={"px-3 py-2"} key={"0"}>PROPOSOL</Badge> : ''
                                                                ]
                                                        ]
                                                }
                                            </td>
                                            <td>{temp.filename}</td>
                                            <td>{temp.tempDesc}</td>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}><Badge variant="dark" className={"px-3 py-2"}>{temp.username}</Badge></td>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} className={"px-2"} type={"submit"}
                                                            onClick={(e) => this.handleDownload(e, temp.filename, temp.tempFileId)}>Download</Button>
                                                    <Button variant={"warning"} className={"px-4"} type={"submit"}
                                                            onClick={() => this.handleUpdate(temp.id)}>Edit</Button>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={() => this.handleDelete(temp.id, temp.tempFileId)}>Delete</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>
                </Card>
            </div>
        )
    }
}