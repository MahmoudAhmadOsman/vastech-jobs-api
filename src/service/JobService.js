import axios from "axios";

const BASE_URL = "https://stapes-api.onrender.com/jobs";

class JobService {
	getAllJobs() {
		return axios.get(BASE_URL);
	}

	getJobById(id) {
		return axios.get(`${BASE_URL}/${id}`);
	}
}
export default new JobService();
