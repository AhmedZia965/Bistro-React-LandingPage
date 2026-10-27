
import axios from "axios";

// Get all menu items
export async function getMenuAxiosFunction() {
    return await axios.get("http://localhost:3000/menu");
}

// Add a menu item
export async function addMenuAxiosFunction(data) {
    return await axios.post("http://localhost:3000/menu", data);
}

// Update a menu item
export async function updateMenuAxiosFunction(id, data) {
    return await axios.put(`http://localhost:3000/menu/${id}`, data);
}

// Delete a menu item
export async function deleteMenuAxiosFunction(id) {
    return await axios.delete(`http://localhost:3000/menu/${id}`);
}
