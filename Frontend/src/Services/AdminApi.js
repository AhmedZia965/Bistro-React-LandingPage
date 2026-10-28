
import axios from "axios";

export function adminLoginAxiosFunction(data) {
    return axios.post("http://localhost:3000/admin/login", data);
}

export function getCustomerFeedbackAxiosFunction() {
    return axios.get("http://localhost:3000/admin/feedback");
}

// ================= STAFF FUNCTIONS =================

export function getStaffAxiosFunction() {
    return axios.get("http://localhost:3000/admin/staff");
}

export function addStaffAxiosFunction(data) {
    return axios.post("http://localhost:3000/admin/staff", data);
}

export function deleteStaffAxiosFunction(id) {
    return axios.delete(`http://localhost:3000/admin/staff/${id}`);
}

export function updateStaffAxiosFunction(id, data) {
    return axios.put(`http://localhost:3000/admin/staff/${id}`, data);
}
