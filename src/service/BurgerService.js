import axios from "axios";

const BASE_URL = "https://stapes-api.onrender.com/burgers";
const DRINKS_URL = "https://stapes-api.onrender.com/drinks_api";

class BurgerService {
	getAllBurgers() {
		return axios.get(BASE_URL);
	}

	getBurgerId(id) {
		return axios.get(`${BASE_URL}/${id}`);
	}

	getAllDrinks() {
		return axios.get(DRINKS_URL);
	}

	getDrinkId(id) {
		return axios.get(`${DRINKS_URL}/${id}`);
	}
}
export default new BurgerService();
