import axios from 'axios';

const USER_API_BASE_URL = "https://icaf-backend.azurewebsites.net/api/adminuser/addadminuser";

class UserService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }

}

export default new UserService()