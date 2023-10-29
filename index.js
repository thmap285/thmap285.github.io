const columnList = document.querySelectorAll(".column");
const addButtonList = document.querySelectorAll(".btn_add");

columnList.forEach((column) => {
  column.addEventListener("drop", drop);
  column.addEventListener("dragover", allowDrop);
});

addButtonList.forEach((addButton) => {
  addButton.addEventListener("click", (e) => {
    addItem(e.target.dataset.type);
  });
});

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  if (event.currentTarget !== event.target) return;
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text");
  const targetColumn = event.target;
  targetColumn.appendChild(document.getElementById(itemId));
}

function addItem(columnId) {
  const column = document.getElementById(columnId);
  const newItem = document.createElement("div");
  newItem.className = "item";
  newItem.innerHTML = '<span class="text" contenteditable="true">Untitled</span>';
  newItem.draggable = true;
  newItem.id = "item" + Date.now();
  newItem.addEventListener("dragstart", drag);

  column.appendChild(newItem);
}