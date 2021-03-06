import axios from "axios";

const R_URL = 'https://icaf-backend.azurewebsites.net/api/researcher';
const C_URL = 'https://icaf-backend.azurewebsites.net/api/conductor';

class ReviewDataService {

    getResearPapers() {
        return axios.get(`${R_URL}`)
    }

    getProposols() {
        return axios.get(`${C_URL}`)
    }

    downloadPaper(id) {
        return axios.get(`https://icaf-backend.azurewebsites.net/templates/download/${id}`, {responseType: 'blob'})
    }

    downloadProposol(id) {
        return axios.get(`https://icaf-backend.azurewebsites.net/templates/download/${id}`, {responseType: 'blob'})
    }

    updatePaperSubmissionStatus(data) {
        return axios.put(`${R_URL}/update/submission/status`, data)
    }

    updateProposalSubmissionStatus(data) {
        return axios.put(`${C_URL}/update/submission/status`, data)
    }

    filterPapersBySubmissionStatus(status) {
        return axios.get(`${R_URL}/filter/submission/${status}`)
    }

    filterProposalsBySubmissionStatus(status) {
        return axios.get(`${C_URL}/filter/submission/${status}`)
    }

    searchPapersByConferenceId(search) {
        return axios.get(`${R_URL}/search/conference/${search}`)
    }

    searchProposalsByConferenceId(search) {
        return axios.get(`${C_URL}/search/conference/${search}`)
    }

    approveNotification(email, subject, body) {
        return axios.post(`https://icaf-backend.azurewebsites.net/api/sendEmails/Email/${email}/${subject}/${body}`)
    }

}

export default new ReviewDataService();