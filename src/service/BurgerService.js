import axios from "axios";

const BASE_URL = "https://stapes-api.onrender.com/burgers";
const DRINKS_URL = "https://stapes-api.onrender.com/drinks_api";
const ORDER_URL = "https://stapes-api.onrender.com/orders";

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

	saveOrder() {
		return axios.post(ORDER_URL);
	}

	getAllOrders() {
		return axios.get(ORDER_URL);
	}
}
export default new BurgerService();
