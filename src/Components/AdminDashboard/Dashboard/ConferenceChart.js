import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from "axios";
import "./Dashboard.css"


class ConferenceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confStat: [],
            confStatus: ["approve", "pending", "reject", "update"]
        }
    }

    componentDidMount() {
        this.getChartDataforConfference();
    }

    getChartDataforConfference() {
        axios.get("https://icaf-backend.azurewebsites.net/api/information/getConferenceStatus").then(res => {
            this.setState({confStat: res.data});
        });
        console.log(this.state.confStat)
    }

    render() {

        return (

            <div className={"pie-chart-div"}>
                <Pie
                    data={{
                        labels: this.state.confStatus,
                        datasets: [
                            {
                                label: 'count',
                                backgroundColor: [
                                    '#28a745',
                                    '#ffc107',
                                    '#dc3545',
                                    '#007bff'],
                                borderColor: 'rgba(0,0,0,0)',
                                borderWidth: 2,
                                data: this.state.confStat
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'Conference Status Statistics',
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

export default ConferenceChart;