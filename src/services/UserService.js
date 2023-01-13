import http from "../http-common";

class UserService {
  
  login(data) {
    return http.post("/user/login", data);
  }

}

export default new UserService();