import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Card, Form, Table} from "react-bootstrap";
import TemplatesDataService from "./TemplatesDataService";
import Swal from "sweetalert2";

export default class TemplateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            template: [],
            search:''
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

    previewTemplate = () => {

    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdate = (id) => {
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
                        html: '<p>Your file has been delted!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#58b7ff'
                    })

                    this.refreshList();
                }
                console.log(res)
            })



        // console.log(id + fileId)
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

        TemplatesDataService.searchByAddedUser(username)
            .then( res => {
                console.log(res.data)
            })

    }

    clearSearch = () => {
        if (this.state.search !== '') {
            this.setState({
                search: ''
            })
            this.refreshList();
        }
    }

    render() {
        const {template, search} = this.state;

        return (
            <div className={"m-3"}>
                <Card>
                    <Form inline style={{float:'right'}} >
                        <input type={"text"} name="search" placeholder={"Search"} className={"form-control"} value={search}
                               onChange={this.handleChange} onClick={this.clearSearch}/>
                        <Button variant={"dark"} type={"submit"} className={"ml-3"}
                                onClick={(e) => this.handleSearch(e, search)}>OK</Button>
                    </Form>

                    <Table striped responsive hover bordered>
                        <thead>
                        <tr>
                            <th className={"text-center"}>Title</th>
                            <th className={"text-center"}>Description</th>
                            <th className={"text-center"}>Template Type</th>
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
                                    template.map (temp =>
                                        <tr key={temp.id}>
                                            <td>{temp.tempTitle}</td>
                                            <td>{temp.tempDesc}</td>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}>
                                                {
                                                    temp.tempType === 'powerpoint' ?
                                                        <Badge variant="primary" className={"px-3 py-2"} key={"0"}>{temp.tempType}</Badge>
                                                        : [
                                                            temp.tempType === 'research' ?
                                                                <Badge variant="success" className={"px-3 py-2"} key={"0"}>{temp.tempType}</Badge>
                                                                : [
                                                                    temp.tempType === 'other' ?
                                                                        <Badge variant="info" className={"px-3 py-2"} key={"0"}>{temp.tempType}</Badge> : ''
                                                                ]
                                                        ]
                                                }
                                            </td>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}><Badge variant="dark" className={"px-3 py-2"}>{temp.username}</Badge></td>
                                            <td className={"text-center"} style={{verticalAlign:'middle'}}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} className={"px-2"} type={"submit"}
                                                            onClick={(e) => this.handleDownload(e, temp.filename, temp.tempFileId)}>Download</Button>
                                                    <Button variant={"warning"} className={"px-4"} type={"submit"}
                                                            onClick={(e) => this.handleUpdate(temp.id)}>Edit</Button>
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