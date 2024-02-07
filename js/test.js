const openbtn = document.getElementById("openControls");
const closebtn = document.getElementById("closeControls");
const popup = document.getElementById("popup");

openbtn.addEventListener("click", () => {
    popup.classList.add("open");
});

closebtn.addEventListener("click", () => {
    popup.classList.remove("open");
});