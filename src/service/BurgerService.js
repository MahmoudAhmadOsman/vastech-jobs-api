import axios from "axios";

const BASE_URL = "https://stapes-api.onrender.com/burgers";

class BurgerService {
	getAllBurgers() {
		return axios.get(BASE_URL);
	}

	getBurgerId(id) {
		return axios.get(`${BASE_URL}/${id}`);
	}
}
export default new BurgerService();
