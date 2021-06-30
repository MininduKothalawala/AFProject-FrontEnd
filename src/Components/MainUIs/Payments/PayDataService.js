import axios from "axios";

const A_URL = 'https://icaf-backend.azurewebsites.net/api/attendee';
const R_URL = 'https://icaf-backend.azurewebsites.net/api/researcher';

class PayDataService {

    loadPaymentDetails(url) {
        return axios.get(`${A_URL}/${url}`)
    }

    getCardDetails(cardNo) {
        return axios.get(`https://icaf-backend.azurewebsites.net/api/payment/getcarddetail/${cardNo}`)
    }

    updatePaymentAttendee(data) {
        return axios.put(`${A_URL}/update/payment/status`, data)
    }

    updatePaymentResearcher(data) {
        return axios.put(`${R_URL}/update/payment/status`, data)
    }

    paymentNotification(email, subject, body) {
        return axios.post(`https://icaf-backend.azurewebsites.net/api/sendEmails/Email/${email}/${subject}/${body}`)
    }

}

export default new PayDataService();