const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedItem = null;

let startX = 0;
let startY = 0;

let currentX = 0;
let currentY = 0;

items.forEach((item) => {

  item.addEventListener("mousedown", (e) => {

    selectedItem = item;

    startX = e.clientX;
    startY = e.clientY;

    currentX = 0;
    currentY = 0;

    container.classList.add("active");

    item.style.cursor = "grabbing";

    e.preventDefault();
  });

});


container.addEventListener("mousemove", (e) => {

  if (!selectedItem) {
    return;
  }

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  let newX = currentX + dx;
  let newY = currentY + dy;

  const containerRect = container.getBoundingClientRect();
  const itemRect = selectedItem.getBoundingClientRect();

  // Container boundaries
  const minX = containerRect.left - itemRect.left;
  const maxX = containerRect.right - itemRect.right;

  const minY = containerRect.top - itemRect.top;
  const maxY = containerRect.bottom - itemRect.bottom;

  // Keep cube inside container
  newX = Math.max(minX, Math.min(newX, maxX));
  newY = Math.max(minY, Math.min(newY, maxY));

  selectedItem.style.transform =
    `translate(${newX}px, ${newY}px)`;

  currentX = newX;
  currentY = newY;

  startX = e.clientX;
  startY = e.clientY;

});


document.addEventListener("mouseup", () => {

  if (!selectedItem) {
    return;
  }

  selectedItem.style.cursor = "grab";

  selectedItem = null;

  container.classList.remove("active");

});