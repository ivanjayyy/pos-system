import initOrderForm from "./controller/order-controller.js";
import {get_customers} from "./model/customer-model.js";
import {get_items} from "./model/item-model.js";
import {get_orders} from "./model/order-model.js";

// loading screen
const loadingScreen = document.getElementById('pre-loader');

window.addEventListener('load', function () {
    loadingScreen.style.display = 'none';
})

// login
const USER = {username: "ivan", password: "123"};

$("#login-form").on("submit", e => {
    e.preventDefault();
    if ($("#username").val() === USER.username && $("#password").val() === USER.password) {
        $("#login-page").hide();
        $("#topbar").hide();
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
    $("#topbar").hide();
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
    $("#topbar").fadeIn();
    $("#activeSectionLabel").text("Customer")
    $("#customer-page").fadeIn();
});

// item
$(".item-btn").on("click", () => {
    $("#home").hide();
    $("#order-page").hide();
    $("#customer-page").hide();
    $("#topbar").fadeIn();
    $("#activeSectionLabel").text("Item")
    $("#item-page").fadeIn();
});

// order
$(".order-btn").on("click", () => {
    $("#item-page").hide();
    $("#home").hide();
    $("#customer-page").hide();
    $("#topbar").hide();
    $("#order-page").fadeIn();

    initOrderForm();
});

// search
$("#globalSearch").on("input", function () {
    const q = $(this).val().trim().toLowerCase();
    const section = $("#activeSectionLabel").text().trim().toLowerCase();

    if (!q) {
        $("#customerTableBody tr").show();
        $("#itemTableBody tr").show();
        return;
    }

    if (section.includes("customer")) {
        $("#customerTableBody tr").each(function () {
            $(this).toggle($(this).text().toLowerCase().includes(q));
        });
    } else if (section.includes("item")) {
        $("#itemTableBody tr").each(function () {
            $(this).toggle($(this).text().toLowerCase().includes(q));
        });
    } else {
        $("#customerTableBody tr, #itemTableBody tr").each(function () {
            $(this).toggle($(this).text().toLowerCase().includes(q));
        });
    }
});

