import {order_db} from "../db/db.js";
import OrderDto from "../dto/order-dto.js";

// ================ Add Order ===================
// const add_order = (id, name, contact, address) => {
//     let customer_obj = new CustomerDto(id, name, contact, address);
//     customer_db.push(customer_obj);
// }

// ============== Delete Customer ==================
// const delete_customer = (index) => {
//     customer_db.splice(index, 1);
// }

// =============== Get Orders ===================
const get_orders = () => {
    return order_db;
}

// =============== Get Customer Detail ===================
// const get_customer_detail = (index) => {
//     return customer_db[index];
// }

// ============== Update Student ==================
// const update_customer = (index, id, name, contact, address) => {
//     customer_db[index] = new CustomerDto(id, name, contact, address);
// }


export default get_orders;