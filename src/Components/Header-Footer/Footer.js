import React, {Component} from "react";
import "./Header-Footer.css"
import {Container} from "react-bootstrap";

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }


    render() {

        return (
            <Container fluid className={"footer-div"}>
                <Container>
                    <h5>CONTACT US</h5>
                    <hr/>
                    <p>Sri Lanka Institute of Information Technology, New Kandy Road, Malabe, Sri Lanka</p>
                    <p><span>Telephone:</span> +94 11 222 2222, <span>Email:</span> contact@icaf.sliit.com</p>
                </Container>
                <div className={"sub-footer"}>&copy; 2021 Sri Lanka Institute of Information Technology. All Rights Reserved.</div>
            </Container>

        )
    }

}

export default Footer;