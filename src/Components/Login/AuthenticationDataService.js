import axios from 'axios'

class AthenticationDataService{

    getUser(username){
        return axios.get(`http://localhost:8080/api/adminuser/getadminuser/${username}`);
    }

}

export default new AthenticationDataService();