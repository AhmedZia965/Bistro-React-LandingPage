import axios from "axios";

export function staffLoginAxiosFunction(email, password) {
    return axios.get("http://localhost:3000/staff/login", {
        params: {
            email: email,
            password: password
        }
    });
}