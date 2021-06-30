// import React from 'react';
// import {Doughnut, Line, Pie} from 'react-chartjs-2';
// import {Card} from "react-bootstrap";
// import axios from "axios";
//
//
// const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//         {
//             label: "First dataset",
//             data: [33, 53, 85, 41, 44, 65],
//             fill: true,
//             backgroundColor: "rgba(75,192,192,0.2)",
//             borderColor: "rgba(75,192,192,1)"
//         },
//         {
//             label: "Second dataset",
//             data: [33, 25, 35, 51, 54, 76],
//             fill: false,
//             borderColor: "#742774"
//         }
//     ]
// };
//
// /*const state = {
//
//     labels: ['January', 'February', 'March',
//         'April', 'May'],
//
//     datasets: [
//         {
//             label: 'Rainfall',
//             backgroundColor: [
//                 '#B21F00',
//                 '#C9DE00',
//                 '#2FDE00',
//                 '#00A6B4',
//                 '#6800B4'
//             ],
//             hoverBackgroundColor: [
//                 '#501800',
//                 '#4B5000',
//                 '#175000',
//                 '#003350',
//                 '#35014F'
//             ],
//             data: [20, 563, 80, 81, 56]
//         }]
// };*/
//
//
// export default class ChartComponents extends React.Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//
//                     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//                     datasets: [
//                         {
//                             label: 'Rainfall',
//                             backgroundColor: [
//                                 '#B21F00',
//                                 '#C9DE00',
//                                 '#2FDE00',
//                                 '#00A6B4',
//                                 '#6800B4'
//                             ],
//                             hoverBackgroundColor: [
//                                 '#501800',
//                                 '#4B5000',
//                                 '#175000',
//                                 '#003350',
//                                 '#35014F'
//                             ],
//                             data: [1,2,3,]
//
//                 },
//             ]
//         }
//
//         this.getResearcherCount = this.getResearcherCount.bind(this);
//
//     }
//
//
//     componentDidMount() {
//         this.getResearcherCount();
//     }
//
//     getResearcherCount = () => {
//         axios.get('https://icaf-backend.azurewebsites.net/api/researcher/getResearcherCount').then(response => {
//             console.log(response.data)
//             this.setState({
//                 data: response.data
//
//             });
//
//         }).catch(function (error) {
//             console.log(error);
//         })
//     }
//
//
//
//
//     render() {
//
//
//
//
//         return (
//             <div>
//                 <tr>
//                     <td>
//                         <Card style={{width: '18rem'}}>
//                             {/* eslint-disable-next-line react/jsx-no-undef */}
//                             <Card.Body>
//                                 <Card.Title>Card Title</Card.Title>
//                                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//                                 <Card.Text>
//                                 </Card.Text>
//                                 <Pie
//                                     data={this.state}
//                                     options={{
//                                         title: {
//                                             display: true,
//                                             text: 'Average Rainfall per month',
//                                             fontSize: 20
//                                         },
//                                         legend: {
//                                             display: true,
//                                             position: 'right'
//                                         }
//                                     }}
//                                 />
//
//
//                                 <Card.Link href="#">Card Link</Card.Link>
//                                 <Card.Link href="#">Another Link</Card.Link>
//                             </Card.Body>
//                         </Card>
//
//                     </td>
//                     <td>
//                         <Card style={{width: '18rem'}}>
//                             {/* eslint-disable-next-line react/jsx-no-undef */}
//                             <Card.Body>
//                                 <Card.Title>Card Title</Card.Title>
//                                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//                                 <Card.Text>
//                                 </Card.Text>
//                                 <Doughnut
//                                     data={this.state}
//                                     options={{
//                                         title: {
//                                             display: true,
//                                             text: 'Average Rainfall per month',
//                                             fontSize: 20
//                                         },
//                                         legend: {
//                                             display: true,
//                                             position: 'right'
//                                         }
//                                     }}
//                                 />
//
//
//                                 <Card.Link href="#">Card Link</Card.Link>
//                                 <Card.Link href="#">Another Link</Card.Link>
//                             </Card.Body>
//                         </Card>
//                     </td>
//                 </tr>
//
//                 <tr>
//                     <td>
//                         <Card style={{width: '30rem'}}>
//                             <Line data={data}/>
//
//                         </Card>
//                     </td>
//                 </tr>
//
//
//             </div>
//         );
//     }
// }