export default class OrderDto {

    constructor(id, name, contact, address) {
        this._id = id;
        this._custName = name;
        this._date = contact;
        this._total = address;
    }

    get id() {
        return this._id;
    }
    get custName() {
        return this._custName;
    }
    get date() {
        return this._date;
    }
    get total() {
        return this._total;
    }

    set id(id) {
        this._id = id;
    }
    set custName(name) {
        this._custName = name;
    }
    set date(contact) {
        this._date = contact;
    }
    set total(address) {
        this._total = address;
    }
}