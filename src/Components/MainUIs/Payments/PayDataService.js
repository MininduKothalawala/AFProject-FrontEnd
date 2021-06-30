import axios from "axios";

const A_URL = 'http://localhost:8080/api/attendee';
const R_URL = 'http://localhost:8080/api/researcher';

class PayDataService {

    loadPaymentDetails(url) {
        return axios.get(`${A_URL}/${url}`)
    }

    getCardDetails(cardNo) {
        return axios.get(`http://localhost:8080/api/payment/getcarddetail/${cardNo}`)
    }

    updatePaymentAttendee(data) {
        return axios.put(`${A_URL}/update/payment/status`, data)
    }

    updatePaymentResearcher(data) {
        return axios.put(`${R_URL}/update/payment/status`, data)
    }

    paymentNotification(email, subject, body) {
        return axios.post(`http://localhost:8080/api/sendEmails/Email/${email}/${subject}/${body}`)
    }

}

export default new PayDataService();