
import axios from "axios";

export async function signupAxiosFunction(data) {
    console.log("signupAxiosFunction called", data);
    return await axios.post("http://localhost:3000/signup/register", data);
}

export async function loginAxiosFunction(data) {
    console.log("loginAxiosFunction called", data);
    return await axios.post("http://localhost:3000/signup/login", data);
}

export async function getCustomerProfileAxiosFunction(id) {
    console.log("getCustomerProfileAxiosFunction called", id);
    return await axios.get(`http://localhost:3000/signup/profile/${id}`);
}

export async function updateCustomerProfileAxiosFunction(id, data) {
    console.log("updateCustomerProfileAxiosFunction called", id, data);
    return await axios.put(`http://localhost:3000/signup/profile/${id}`, data);
}

export async function getCustomerAddressesAxiosFunction(id) {
    console.log("getCustomerAddressesAxiosFunction called", id);
    return await axios.get(`http://localhost:3000/signup/addresses/${id}`);
}

export async function saveCustomerAddressesAxiosFunction(id, addresses) {
    console.log("saveCustomerAddressesAxiosFunction called", id, addresses);
    return await axios.post(`http://localhost:3000/signup/addresses/${id}`, {
        addresses: addresses
    });
}

export async function deleteCustomerAddressAxiosFunction(id, addressId) {
    console.log("deleteCustomerAddressAxiosFunction called", id, addressId);
    return await axios.delete(`http://localhost:3000/signup/addresses/${id}/${addressId}`);
}

export async function deleteCustomerAccountAxiosFunction(id) {
    console.log("deleteCustomerAccountAxiosFunction called", id);
    return await axios.delete(`http://localhost:3000/signup/account/${id}`);
}

export async function addFeedbackAxiosFunction(id, data) {
    console.log("addFeedbackAxiosFunction called", id, data);
    return await axios.post(`http://localhost:3000/signup/feedback/${id}`, data);
}
