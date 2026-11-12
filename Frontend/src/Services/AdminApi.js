
import axios from "axios";

export function adminLoginAxiosFunction(data) {
    console.log("adminLoginAxiosFunction called", data);
    return axios.post("http://localhost:3000/admin/login", data);
}

export function getCustomerFeedbackAxiosFunction() {
    console.log("getCustomerFeedbackAxiosFunction called");
    return axios.get("http://localhost:3000/admin/feedback");
}

// ================= STAFF FUNCTIONS =================

export function getStaffAxiosFunction() {
    console.log("getStaffAxiosFunction called");
    return axios.get("http://localhost:3000/admin/staff");
}

export function addStaffAxiosFunction(data) {
    console.log("addStaffAxiosFunction called", data);
    return axios.post("http://localhost:3000/admin/staff", data);
}

export function deleteStaffAxiosFunction(id) {
    console.log("deleteStaffAxiosFunction called", id);
    return axios.delete(`http://localhost:3000/admin/staff/${id}`);
}

export function updateStaffAxiosFunction(id, data) {
    console.log("updateStaffAxiosFunction called", id, data);
    return axios.put(`http://localhost:3000/admin/staff/${id}`, data);
}

// ================= OFFER FUNCTIONS =================

// Get all offers
export function getOffersAxiosFunction() {
    console.log("getOffersAxiosFunction called");
    return axios.get("http://localhost:3000/admin/offers");
}

// Add a new offer
export function addOfferAxiosFunction(data) {
    console.log("addOfferAxiosFunction called", data);
    return axios.post("http://localhost:3000/admin/offers", data);
}

// Delete an offer
export function deleteOfferAxiosFunction(id) {
    console.log("deleteOfferAxiosFunction called", id);
    return axios.delete(`http://localhost:3000/admin/offers/${id}`);
}
