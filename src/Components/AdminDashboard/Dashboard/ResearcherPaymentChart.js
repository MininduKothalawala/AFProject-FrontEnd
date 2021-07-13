import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from "axios";
import "./Dashboard.css"

class ResearcherPaymentChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resStat: [],
            resStatus: ["pending", "paid"]

        }
    }

    componentDidMount() {
        this.getDataforResearcherPayment();
    }

    getDataforResearcherPayment() {
        axios.get("http://localhost:8080/api/information/getResearcherPaymentStatus").then(res => {
            this.setState({resStat: res.data});
        });
        console.log(this.state.resStat)
    }

    render() {

        return (
            <div className={"pie-chart-div"}>
                <Pie
                    data={{
                        labels: this.state.resStatus,
                        datasets: [
                            {
                                label: this.state.resStatus,
                                backgroundColor: [
                                    '#ffc107',
                                    '#28a745'],
                                borderColor: 'rgba(0,0,0,0)',
                                borderWidth: 2,
                                data: this.state.resStat
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'Researcher Payment Status Statistics',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );

    }
}

export default ResearcherPaymentChart;