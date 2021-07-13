import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/adminuser/addadminuser";

class UserService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }

}

export default new UserService()