import React, {Component} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "../../Header-Footer/Header";
import TemplatesDataService from "../../AdminDashboard/Templates/TemplatesDataService";
import "./TemplateMain.css"

class ResearchTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            templates: []
        }
    }

    componentDidMount() {
        TemplatesDataService.filterByType("research")
            .then(res => {
                console.log(res.data)

                this.setState({
                    templates: res.data
                })
            })
    }

    downloadTemplate = (e, filename, fid) => {
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

    render() {
        const { templates } = this.state
        return(
            <div>
                <Header/>

                <Container className={"my-5"}>

                    <h3 className={"text-center my-5"}>Research Paper Templates</h3>

                    {
                        templates.length > 0 ?
                            [
                                <Row key={0}>
                                    {
                                        templates.map(template =>
                                            <Col sm={4} className={"card-group mb-4"} key={template.id}>
                                                <Card className={"template-card"} style={{width: '30rem'}} key={template.id}
                                                      onClick={(e) => this.downloadTemplate(e, template.tempFileName, template.tempFileId)}>
                                                    <Card.Img variant={"top"} width={"100px"} src={`https://icaf-backend.azurewebsites.net/templates/download/${template.imgFileId}`} />
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            ]
                            : <Container>
                                <h3 className={"text-center my-5"}>No Templates Available</h3>
                            </Container>
                    }
                </Container>
            </div>
        )
    }

}

export default ResearchTemplates;