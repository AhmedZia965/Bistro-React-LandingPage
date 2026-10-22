
import axios from "axios";

export async function signupAxiosFunction(data) {
    console.log("signupAxiosFunction called");
    return await axios.post("http://localhost:3000/signup", data);
}
