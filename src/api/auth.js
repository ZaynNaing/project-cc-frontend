import axios from "axios";

const API_URL = "https://jelcknbb5f.execute-api.us-east-1.amazonaws.com/prod";

export default axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});
