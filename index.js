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

  // Lưu trữ thông tin vị trí của các items
  const items = document.querySelectorAll('.item');
  const itemPositions = [];
  
  for (let i = 0; i < items.length; i++) {
    const itemPosition = {
      id: items[i].id,
      column: items[i].parentNode.id,
      index: i
    };
    itemPositions.push(itemPosition);
  }

  localStorage.setItem("itemPositions", JSON.stringify(itemPositions));
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

window.onload = function() {
  // Lấy thông tin vị trí của các items từ localStorage
  const itemPositions = JSON.parse(localStorage.getItem("itemPositions"));

  // Thực hiện đặt lại vị trí của các items trên trang
  if (itemPositions !== null) {
    for (let i = 0; i < itemPositions.length; i++) {
      const item = document.getElementById(itemPositions[i].id);
      const column = document.getElementById(itemPositions[i].column);
      const index = itemPositions[i].index;
      column.insertBefore(item, column.children[index]);
    }
  }
};
