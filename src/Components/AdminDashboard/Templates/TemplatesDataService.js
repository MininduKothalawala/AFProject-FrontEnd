import axios from "axios";

const API_URL = 'http://localhost:8080/templates';

class TemplatesDataService {

    getAllResearchTemplates(type) {
        return axios.get(`${API_URL}/${type}`)
    }

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

    editTemplate(data) {

    }

    deleteTemplate(id, fileId) {
        return axios.delete(`${API_URL}/${id}/${fileId}`)
    }




}

export default new TemplatesDataService();