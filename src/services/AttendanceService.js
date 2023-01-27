import http from "../http-common";

class AttendanceService {
  getLastAttendance() {
    return http.get("/attendance/lastfive");
  }
  getcountattendance() {
    return http.get("/attendance/count");
  }
  create(data) {
    return http.post("/attendance", data);
  }

}

export default new AttendanceService();