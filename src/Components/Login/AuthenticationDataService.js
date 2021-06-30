import axios from 'axios'

class AthenticationDataService{

    getUser(username){
        return axios.get(`https://icaf-backend.azurewebsites.net/api/adminuser/getadminuser/${username}`);
    }

}

export default new AthenticationDataService();