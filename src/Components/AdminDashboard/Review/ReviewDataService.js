import axios from "axios";

const R_URL = 'http://localhost:8080/api/researcher';
const C_URL = 'http://localhost:8080/api/conductor';

class ReviewDataService {

    getResearPapers() {
        return axios.get(`${R_URL}`)
    }

    getProposols() {
        return axios.get(`${C_URL}`)
    }

    downloadPaper(id) {
        return axios.get(`${R_URL}/download/${id}`, {responseType: 'blob'})
    }

    downloadProposol(id) {
        return axios.get(`${C_URL}/download/${id}`, {responseType: 'blob'})
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
        return axios.post(`http://localhost:8080/api/sendEmails/Email/${email}/${subject}/${body}`)
    }

}

export default new ReviewDataService();