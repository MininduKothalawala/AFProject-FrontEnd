import React, {Component} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import Header from "../../Header-Footer/Header";
import TemplatesDataService from "../../AdminDashboard/Templates/TemplatesDataService";
import "./TemplateMain.css"
import bgImg from "../../../Assets/templates-bg-img.jpg";
import Footer from "../../Header-Footer/Footer";

class PresentationTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            templates: []
        }
    }

    componentDidMount() {
        TemplatesDataService.filterByType("powerpoint")
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
                {/*-----------------------------------------------Header---------------------------------------------*/}
                <div>
                    <div className={"templates-header"}>
                        <Header/>
                    </div>
                    <div className={"templates-page-img-overlay"}>
                        <Image className={"templates-page-img"} src={bgImg} alt="background image"/>
                    </div>
                    <Container className={"templates-page-title"}>
                        <h1 className={"templates-page-title-h1"}>Presentation Templates</h1>
                        <div className={"templates-breadcrumb"}>
                            <h5 className={"templates-page-title-h5"}>
                                <a href={"/"} >Home > </a>
                                Presentation Templates
                            </h5>
                        </div>
                    </Container>
                </div>

                {/*----------------------------------------Main Content----------------------------------------------*/}
                <div >
                    <Container>


                        <div className={"templates-outer-div"}>
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
                                        <h1 className={"text-center my-5"}>No Templates Available</h1>
                                    </Container>
                            }
                        </div>


                    </Container>
                </div>

                {/*-----------------------------------------------Footer---------------------------------------------*/}
                <div>
                    <Footer />
                </div>
            </div>
        )
    }

}

export default PresentationTemplates;