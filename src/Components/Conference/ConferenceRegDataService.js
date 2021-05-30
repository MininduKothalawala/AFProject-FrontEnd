import axios from "axios";

const R_REG = 'http://localhost:8080/api/researcher';
const C_REG = 'http://localhost:8080/api/conductor';

class ConferenceRegDataService {

    regAsResearcher(data) {
        return axios.post(`${R_REG}/addresearcher`, data)
    }

    regAsConductor(data) {
        return axios.post(`${C_REG}/addconductor`, data)
    }

}

export default new ConferenceRegDataService();