import initOrderForm from "./controller/order-controller.js";
import {get_customers} from "./model/customer-model.js";
import {get_items} from "./model/item-model.js";
import {get_orders} from "./model/order-model.js";

// login
const USER = {username: "ivan", password: "123"};

$("#login-form").on("submit", e => {
    e.preventDefault();
    if ($("#username").val() === USER.username && $("#password").val() === USER.password) {
        $("#login-page").hide();
        $("#main-app").fadeIn();
        $("#navbar-container").fadeIn();

        $("#customer-count").text(get_customers().length);
        $("#item-count").text(get_items().length);
        $("#order-count").text(get_orders().length);

    } else {$("#login-error").fadeIn().delay(1500).fadeOut();}
});

// logout
$("#logout-btn").on("click", () => {
    $("#main-app").hide();
    $("#navbar-container").hide();
    $("#login-page").fadeIn();
});

// home
$(".home-btn").on("click", () => {
    $("#item-page").hide();
    $("#order-page").hide();
    $("#customer-page").hide();
    $("#home").fadeIn();

    $("#customer-count").text(get_customers().length);
    $("#item-count").text(get_items().length);
    $("#order-count").text(get_orders().length);
});

// customer
$(".customer-btn").on("click", () => {
    $("#home").hide();
    $("#item-page").hide();
    $("#order-page").hide();
    $("#customer-page").fadeIn();
});

// item
$(".item-btn").on("click", () => {
    $("#home").hide();
    $("#order-page").hide();
    $("#customer-page").hide();
    $("#item-page").fadeIn();
});

// order
$(".order-btn").on("click", () => {
    $("#item-page").hide();
    $("#home").hide();
    $("#customer-page").hide();
    $("#order-page").fadeIn();

    initOrderForm();
});