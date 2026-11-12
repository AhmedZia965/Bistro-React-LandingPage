
import axios from "axios";

// Get all menu items
export async function getMenuAxiosFunction() {
    console.log("getMenuAxiosFunction called");
    return await axios.get("http://localhost:3000/menu");
}

// Add a menu item
export async function addMenuAxiosFunction(data) {
    console.log("addMenuAxiosFunction called", data);
    return await axios.post("http://localhost:3000/menu", data);
}

// Update a menu item
export async function updateMenuAxiosFunction(id, data) {
    console.log("updateMenuAxiosFunction called", id, data);
    return await axios.put(`http://localhost:3000/menu/${id}`, data);
}

// Delete a menu item
export async function deleteMenuAxiosFunction(id) {
    console.log("deleteMenuAxiosFunction called", id);
    return await axios.delete(`http://localhost:3000/menu/${id}`);
}
