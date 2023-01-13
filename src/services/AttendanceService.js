import http from "../http-common";

class AttendanceService {
  getLastAttendance() {
    return http.get("/attendance/lastfive");
  }
  create(data) {
    return http.post("/attendance", data);
  }

}

export default new AttendanceService();