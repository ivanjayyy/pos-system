import {order_db} from "../db/db.js";
import OrderDto from "../dto/order-dto.js";


// ================ Add Order ===================
const add_order = (order) => {
    order_db.push(order);
}


// =============== Get Orders ===================
const get_orders = () => {
    return order_db;
}


export {get_orders, add_order};