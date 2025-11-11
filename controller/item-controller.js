import {add_item, update_item, delete_item, get_items, get_item_detail} from "../model/item-model.js";

let tbl_row;
let add_item_flag;

// ==================== Load Item Tbl =======================
const load_item_tbl = () => {
    $("#itemTableBody").empty();
    let item_list = get_items();

    item_list.map((obj, index) => {
        let tbl_row = `<tr data-index="${index}">
        <td>${obj.item_code}</td>
        <td>${obj.itemName}</td>
        <td>${obj.price.toFixed(2)}</td>
        <td>${obj.qty}</td>
        <td><button class='btn btn-sm btn-ghost edit-item' data-index='${index}'>Edit</button>
        <button class='btn btn-sm btn-ghost del-item' data-index='${index}'>Delete</button></td> </tr>`;

        $("#itemTableBody").append(tbl_row);
    });
}


// ==================== Add Item =======================
let nextItemCode = 1;

$("#addItemBtn").on("click",() => {
    $("#itemForm")[0].reset();
    $("#itemCodeHidden").val(nextItemCode++);
    $(".modal-title","#itemModal").text("Add Item");

    add_item_flag = true;
});

$("#itemForm").on("submit", e => {
    e.preventDefault();

    let item_id = $("#itemCodeHidden").val();
    let item_code = $("#itemCode").val().trim();
    let item_name = $("#itemName").val().trim();
    let price = parseFloat($("#itemPrice").val());
    let qty = parseInt($("#itemQty").val());

    // if(!item_code||!item_name||price<0||qty<0)return alert("Invalid input");

    if (add_item_flag) {
        add_item(item_id, item_code, item_name, price, qty);

    } else {
        update_item(tbl_row, item_id, item_code, item_name, price, qty);
    }

    $("#itemModal").modal("hide");
    load_item_tbl();
});


// ==================== Update Item =======================
$(document).on("click",".edit-item",function(){
    tbl_row = $(this).data("index");
    let i = get_item_detail(tbl_row);

    $("#itemModal").modal("show");
    $(".modal-title","#itemModal").text("Edit Item");

    $("#itemCodeHidden").val(i.item_id);
    $("#itemCode").val(i.item_code);
    $("#itemName").val(i.itemName);
    $("#itemPrice").val(i.price);
    $("#itemQty").val(i.qty);

    add_item_flag = false;
});


// ==================== Delete Item =======================
$(document).on("click",".del-item",function(){
    tbl_row = $(this).data('index');

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            delete_item(tbl_row);
            load_item_tbl();

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});

export default load_item_tbl;