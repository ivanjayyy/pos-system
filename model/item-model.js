import {customer_db, item_db} from "../db/db.js";
import ItemDto from "../dto/item-dto.js";

// ================ Add Item ===================
const add_item = (item_id, item_code, itemName, price, qty) => {
    let item_obj = new ItemDto(item_id, item_code, itemName, price, qty);
    item_db.push(item_obj);
}

// ============== Delete Item ==================
const delete_item = (index) => {
    item_db.splice(index, 1);
}
// =============== Get Items ===================
const get_items = () => {
    return item_db;
}

// =============== Get Item Detail ===================
const get_item_detail = (index) => {
    return item_db[index];
}

// ============== Update Item ==================
const update_item = (index, id, code, itemName, price, qty) => {
    item_db[index] = new ItemDto(id, code, itemName, price, qty);
}


export {add_item, update_item, delete_item, get_items, get_item_detail};