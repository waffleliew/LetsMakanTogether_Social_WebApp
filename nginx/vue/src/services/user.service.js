import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://172.17.0.3:8080/api/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getGroupDetails() {
        return axios.get(API_URL + 'group', { headers: authHeader() });
    }

    joinGroup(groupId) {
        return axios.post(API_URL + `group/join/${groupId}`, {}, {headers: authHeader()});
    }

}

export default new UserService();