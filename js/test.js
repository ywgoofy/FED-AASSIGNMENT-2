const openbtn = document.getElementById("openModal");
const closebtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");
const loaderWrapper = document.querySelector(".loader-wrapper");

openbtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closebtn.addEventListener("click", () => {
    modal.classList.remove("open");
});

window.addEventListener("load", function() {
    loaderWrapper.style.display = "none"; // Hide the loader when the page finishes loading
});