import axios from "axios";

const API_URL = 'http://localhost:8080/templates';

class TemplatesDataService {

    getAllResearchTemplates(type) {
        return axios.get(`${API_URL}/${type}`)
    }

    getTemplate(id) {

    }

    addTemplate(data) {
        return axios.post(`${API_URL}/upload`, data)
    }

    editTemplate(data) {

    }

    deleteTemplate(data) {

    }

    searchTemplate(data) {

    }


}

export default new TemplatesDataService();