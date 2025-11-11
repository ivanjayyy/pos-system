import {add_customer, update_customer, delete_customer, get_customers, get_customer_detail} from "../model/customer-model.js";

let tbl_row;
let add_cust;

// ==================== Load Customer Tbl =======================
const load_customer_tbl = () => {
    $("#customerTableBody").empty();
    let customer_list = get_customers();

    customer_list.map((obj, index) => {
        let tbl_row = `<tr data-index="${index}">
        <td>${obj.id}</td>
        <td>${obj.name}</td>
        <td>${obj.contact}</td>
        <td>${obj.address}</td>
        <td><button class='btn btn-sm btn-ghost edit-cust' data-index='${index}'>Edit</button>
        <button class='btn btn-sm btn-ghost del-cust' data-index='${index}'>Delete</button></td> </tr>`;

        $("#customerTableBody").append(tbl_row);
    });
}


// ==================== Add Customer =======================
let nextCustomerId = 1;

$("#addCustomerBtn").on("click",() => {
    $("#customerForm")[0].reset();
    $("#customerId").val(nextCustomerId++);
    $(".modal-title","#customerModal").text("Add Customer");

    add_cust = true;
});

$("#customerForm").on("submit", e => {
    e.preventDefault();

    let id = $("#customerId").val();
    let name = $("#customerName").val().trim();
    let contact = $("#customerContact").val().trim();
    let address = $("#customerAddress").val().trim();

    if (add_cust) {
        add_customer(id, name, contact, address);

    } else {
        update_customer(tbl_row, id, name, contact, address);
    }

    $("#customerModal").modal("hide");
    load_customer_tbl();
});


// ==================== Update Customer =======================
$(document).on("click",".edit-cust",function(){
    tbl_row = $(this).data("index");
    let c = get_customer_detail(tbl_row);

    $("#customerModal").modal("show");
    $(".modal-title","#customerModal").text("Edit Customer");

    $("#customerId").val(c.id);
    $("#customerName").val(c.name);
    $("#customerContact").val(c.contact);
    $("#customerAddress").val(c.address);

    add_cust = false;
});


// ==================== Delete Customer =======================
$(document).on("click",".del-cust",function(){
    tbl_row = $(this).data("index");

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

            delete_customer(tbl_row);
            load_customer_tbl();

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});