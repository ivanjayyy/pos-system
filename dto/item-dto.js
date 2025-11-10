export default class ItemDto {

    constructor(item_id, item_code, itemName, price, qty) {
        this._item_id = item_id;
        this._item_code = item_code;
        this._itemName = itemName;
        this._price = price;
        this._qty = qty;
    }

    get item_id() {
        return this._item_id;
    }

    get item_code() {
        return this._item_code;
    }

    get itemName() {
        return this._itemName;
    }

    get price() {
        return this._price;
    }

    get qty() {
        return this._qty;
    }

    set item_id(item_id) {
        this._item_id = item_id;
    }

    set item_code(item_code) {
        this._item_code = item_code;
    }

    set itemName(itemName) {
        this._itemName = itemName;
    }

    set price(price) {
        this._price = price;
    }

    set qty(qty) {
        this._qty = qty;
    }
}