import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY_PARAM = "?api_key=a592d06fc7d98449424111dbd6bc8b1f"

export class TVShowAPI {
    static async fetchPopulars(){
        const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
        console.log(response.data.results)
        return response.data.results;
        //perform request
        //return the response

    }
}