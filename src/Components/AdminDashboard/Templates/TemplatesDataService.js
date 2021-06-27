import axios from "axios";

const API_URL = 'http://localhost:8080/templates';

class TemplatesDataService {

    //get all types of templates
    getAllTemplates() {
        return axios.get(`${API_URL}/all`)
    }

    //get template by ID
    getTemplate(id) {
        return axios.get(`${API_URL}/${id}`)
    }

    //get template by type
    filterByType(type) {
        return axios.get(`${API_URL}/findByType/${type}`)
    }

    //get template by added user
    searchByAddedUser(username) {
        return axios.get(`${API_URL}/findByUser/${username}`)
    }

    downloadFile(id) {
        return axios.get(`${API_URL}/download/${id}`, {responseType: 'blob'})
    }

    addTemplate(data) {
        return axios.post(`${API_URL}/upload`, data)
    }

    addResearchTemplate(data) {
        return axios.post(`${API_URL}/upload/research`, data)
    }

    editDescription(data) {
        return axios.put(`${API_URL}/updateDesc`, data)
    }

    editTemplate(data) {
        return axios.put(`${API_URL}/update`, data)
    }

    deleteTemplate(id, fileId) {
        return axios.delete(`${API_URL}/${id}/${fileId}`)
    }

    validateConferenceId(id) {
        return axios.get(`http://localhost:8080/api/conference/conferencebyid/${id}`);
    }

}

export default new TemplatesDataService();