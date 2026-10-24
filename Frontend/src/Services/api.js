
import axios from "axios";

export async function signupAxiosFunction(data) {
    console.log("signupAxiosFunction called");
    return await axios.post("http://localhost:3000/signup", data);
}

export async function loginAxiosFunction(data) {
    console.log("loginAxiosFunction called");
    return await axios.post("http://localhost:3000/signup/login", data);
}

export async function getCustomerProfileAxiosFunction(id) {
    return await axios.get(`http://localhost:3000/signup/profile/${id}`);
}

export async function getCustomerAddressesAxiosFunction(id) {
    return await axios.get(`http://localhost:3000/signup/addresses/${id}`);
}

export async function saveCustomerAddressesAxiosFunction(id, addresses) {
    return await axios.post(`http://localhost:3000/signup/addresses/${id}`, {
        addresses: addresses
    });
}
