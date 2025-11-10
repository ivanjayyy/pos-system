import {customer_db, item_db} from "../db/db.js";
import CustomerDto from "../dto/customer-dto.js";

// ================ Add Customer ===================
const add_customer = (id, name, contact, address) => {
    let customer_obj = new CustomerDto(id, name, contact, address);
    customer_db.push(customer_obj);
}

// ============== Delete Customer ==================
const delete_customer = (index) => {
    customer_db.splice(index, 1);
}

// =============== Get Customers ===================
const get_customers = () => {
    return customer_db;
}

// =============== Get Customer Detail ===================
const get_customer_detail = (index) => {
    return customer_db[index];
}

// ============== Update Student ==================
const update_customer = (index, id, name, contact, address) => {
    customer_db[index] = new CustomerDto(id, name, contact, address);
}


export {add_customer, update_customer, delete_customer, get_customers, get_customer_detail};