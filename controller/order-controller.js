import get_orders from "../model/order-model.js";
import {customer_db, item_db, order_db} from "../db/db.js";
import {get_items} from "../model/item-model.js";
import {get_customers} from "../model/customer-model.js";

// let tbl_row;
// let add_cust;

// ==================== Initialize Order Page =======================
function initOrderForm() {
    let order_list = get_orders();

    $("#orderItemsBody").empty();
    $("#grandTotal").text("0.00");
    $("#orderId").val("ORD-" + (order_list.length + 1));
    $("#orderDate").val(new Date().toLocaleDateString());

    renderCustomerDropdown();
    load_order_history();
}


// customer dropdown
function renderCustomerDropdown() {
    const sel = $("#orderCustomer").empty();
    sel.append("<option value=''>-- Select Customer --</option>");

    let customer_list = get_customers();
    customer_list.forEach(c => sel.append(`<option value='${c.id}'>${c.name}</option>`));
}


// ==================== Load Order History =======================
const load_order_history = () => {
    $("#orderHistoryBody").empty();
    let order_list = get_orders();

    order_list.map((obj, index) => {
        let tbl_row = `<tr data-index="${index}">
        <td>${obj.id}</td>
        <td>${obj.custName}</td>
        <td>${obj.date}</td>
        <td>${obj.total.toFixed(2)}</td> </tr>`;

        $("#orderHistoryBody").append(tbl_row);
    });
}


// ==================== Add Order Item =======================
$("#addOrderItemBtn").on("click", () => add_order_row());


// ==================== Add Item Row =======================
function add_order_row() {
    let item_list = get_items();

    const sel=`<select class = 'form-select order-item'>
    <option value=''>Select</option>
    ${item_list.map(i => `<option value = '${i.code}'>${i.name}</option>`).join("")}
    </select>`;

    $("#orderItemsBody").append(`<tr>
    <td>${sel}</td>
    <td class='price'>0.00</td>
    <td><input type='number' class='form-control qty' min='1' value='1'></td>
    <td class='subtotal'>0.00</td>
    <td><button class='btn btn-sm btn-danger del-row'>X</button></td>
    </tr>`);
}


$(document).on("change",".order-item",function(){
    const row = $(this).closest("tr");
    const code = $(this).val();
    const item = item_db.find(i => i.item_code === code);
    if(item) {
        row.find(".price").text(item.price.toFixed(2));
        updateSubtotal(row);
    }
});


$(document).on("input",".qty",function(){
    updateSubtotal($(this).closest("tr"));
});

$(document).on("click",".del-row",function(){
    $(this).closest("tr").remove();
    updateGrandTotal();
});


function updateSubtotal(row){
    const code = row.find(".order-item").val();const item = item_db.find(i => i.item_code === code);
    const qty = parseInt(row.find(".qty").val());
    if(item) {
        const sub = item.price * qty;
        row.find(".subtotal").text(sub.toFixed(2));
        updateGrandTotal();
    }
}


function updateGrandTotal(){
    let total = 0;
    $("#orderItemsBody .subtotal").each(function(){
        total += parseFloat($(this).text())||0;
    });

    $("#grandTotal").text(total.toFixed(2));
}


// place order
$("#placeOrderBtn").on("click",()=>{
    const custId=$("#orderCustomer").val();if(!custId)return alert("Select a customer");
    const rows=$("#orderItemsBody tr");if(rows.length===0)return alert("Add at least one item");
    const orderItems=[];let valid=true;
    rows.each(function(){
        const code=$(this).find(".order-item").val();const qty=parseInt($(this).find(".qty").val());
        const item=item_db.find(i=>i.code===code);
        if(!item||qty>item.qty){alert("Invalid or insufficient stock");valid=false;return false;}
        item.qty-=qty;orderItems.push({code,itemName:item.name,qty,price:item.price});
    });
    if(!valid)return;
    const order={id:$("#orderId").val(),date:$("#orderDate").val(),customerId:custId,
        customerName:customer_db.find(c=>c.id===custId).name,
        items:orderItems,total:parseFloat($("#grandTotal").text())};
    order_db.push(order);add_order_row();load_order_history();
    alert("Order placed successfully!");
    initOrderForm();
});









// ==================== Add Customer =======================
// $("#addCustomerBtn").on("click",() => {
//     $("#customerForm")[0].reset();
//     $("#customerId").val(nextCustomerId++);
//     $(".modal-title","#customerModal").text("Add Customer");
//
//     add_cust = true;
// });
//
// $("#customerForm").on("submit", e => {
//     e.preventDefault();
//
//     let id = $("#customerId").val();
//     let name = $("#customerName").val().trim();
//     let contact = $("#customerContact").val().trim();
//     let address = $("#customerAddress").val().trim();
//
//     if (add_cust) {
//         add_customer(id, name, contact, address);
//
//     } else {
//         update_customer(tbl_row, id, name, contact, address);
//     }
//
//     $("#customerModal").modal("hide");
//     load_customer_tbl();
// });

export default initOrderForm;