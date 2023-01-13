import http from "../http-common";

class StudentDataService {
  getAll() {
    return http.get("/candidate");
  }

  get(id) {
    return http.get(`/candidate/${id}`);
  }

  create(data) {
    return http.post("/candidate", data);
  }

  update(id, data) {
    return http.put(`/candidate/${id}`, data);
  }

  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new StudentDataService();