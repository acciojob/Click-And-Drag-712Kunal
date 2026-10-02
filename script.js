const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach((item) => {

    item.addEventListener("mousedown", (e) => {

        selectedItem = item;

        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // Convert grid position into absolute position
        item.style.position = "absolute";

        item.style.left =
            `${itemRect.left - containerRect.left}px`;

        item.style.top =
            `${itemRect.top - containerRect.top}px`;

        // Remember where the mouse clicked inside the cube
        offsetX = e.clientX - itemRect.left;
        offsetY = e.clientY - itemRect.top;

        item.style.cursor = "grabbing";

        container.classList.add("active");

        e.preventDefault();
    });
});

container.addEventListener("mousemove", (e) => {

    if (!selectedItem) {
        return;
    }

    const containerRect = container.getBoundingClientRect();

    let newLeft =
        e.clientX - containerRect.left - offsetX;

    let newTop =
        e.clientY - containerRect.top - offsetY;

    // Keep the cube inside the container
    const maxLeft =
        container.clientWidth - selectedItem.offsetWidth;

    const maxTop =
        container.clientHeight - selectedItem.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    selectedItem.style.left = `${newLeft}px`;
    selectedItem.style.top = `${newTop}px`;
});

document.addEventListener("mouseup", () => {

    if (!selectedItem) {
        return;
    }

    selectedItem.style.cursor = "grab";

    selectedItem = null;

    container.classList.remove("active");
});