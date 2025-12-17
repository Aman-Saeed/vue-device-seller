import axios from "axios";
import { BASE_API_URL } from "../Constant";

// Ensure there's no duplicate slash when composing endpoints
const API_URL = BASE_API_URL + "/api/authentication";

class AuthenticationService {
  login(user) {
    return axios.post(API_URL + "/sign-in", user);
  }

  register(user) {
    return axios.post(API_URL + "/sign-up", user);
  }
}

export default new AuthenticationService();
