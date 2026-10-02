const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Convert the initial items into positions inside the container
items.forEach((item) => {
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    item.style.position = "absolute";

    item.style.left = `${itemRect.left - containerRect.left}px`;
    item.style.top = `${itemRect.top - containerRect.top}px`;

    item.addEventListener("mousedown", (e) => {
        selectedItem = item;

        const itemRect = item.getBoundingClientRect();

        // Remember where inside the cube the mouse was clicked
        offsetX = e.clientX - itemRect.left;
        offsetY = e.clientY - itemRect.top;

        container.classList.add("active");

        e.preventDefault();
    });
});

// Move selected cube
container.addEventListener("mousemove", (e) => {
    if (!selectedItem) {
        return;
    }

    const containerRect = container.getBoundingClientRect();

    let newLeft =
        e.clientX - containerRect.left - offsetX;

    let newTop =
        e.clientY - containerRect.top - offsetY;

    // Keep cube inside the container
    const maxLeft =
        container.clientWidth - selectedItem.offsetWidth;

    const maxTop =
        container.clientHeight - selectedItem.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    selectedItem.style.left = `${newLeft}px`;
    selectedItem.style.top = `${newTop}px`;
});

// Drop cube
document.addEventListener("mouseup", () => {
    if (selectedItem) {
        selectedItem = null;
        container.classList.remove("active");
    }
});