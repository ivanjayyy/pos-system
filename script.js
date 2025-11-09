// login
const USER = {username: "ivan", password: "123"};

$("#login-form").on("submit", e => {
    e.preventDefault();
    if ($("#username").val() === USER.username && $("#password").val() === USER.password) {
        $("#login-page").hide();
        $("#main-app").show();
        $("#navbar-container").show();

    } else {$("#login-error").fadeIn().delay(1500).fadeOut();}
});