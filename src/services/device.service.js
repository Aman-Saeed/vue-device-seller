import { BASE_API_URL } from "../common/Constants";
import axios from "axios";
import { authHeader } from "./base.service";
import { handleResponseWithLoginCheck } from "./base.service";

const API_URL = BASE_API_URL + "/api/devices";

class DeviceService {
  saveDevice(device) {
    const req = axios.post(API_URL, device, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }

  deleteDevice(device) {
    const req = axios.delete(API_URL + "/" + device.id, {
      headers: authHeader(),
    });

    return handleResponseWithLoginCheck(req);
  }

  getAllDevices() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new DeviceService();
