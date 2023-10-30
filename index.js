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
  newItem.innerHTML = `
    <div class="item-header"> 
      <span class="text" contenteditable="true">Untitled</span>
      <button class="delete">X</button>
    </div>
  `;
  newItem.draggable = true;
  newItem.id = "item" + Date.now();
  newItem.addEventListener("dragstart", drag);

  const deleteButton = newItem.querySelector('.delete');
  deleteButton.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    item.remove();
    saveData();
  });

  column.appendChild(newItem);

  saveData();
}

function saveData() {
  // Lấy tất cả các phần tử có lớp là "item" và lưu chúng vào một mảng
  const items = document.querySelectorAll('.item');
  const itemData = [];

  items.forEach(item => {
    itemData.push({
      id: item.id,
      column: item.parentNode.id,
      text: item.querySelector('.text').textContent
    });
  });

  // Lưu trữ mảng itemData vào localStorage
  localStorage.setItem('kanbanData', JSON.stringify(itemData));
}

function loadData() {
  // Lấy các dữ liệu đã lưu từ localStorage
  const kanbanData = localStorage.getItem('kanbanData');

  // Nếu có dữ liệu, thực hiện việc đặt lại các phần tử trên bảng kanban.
  if (kanbanData !== null) {
    const itemData = JSON.parse(kanbanData);
    itemData.forEach(item => {
      const column = document.getElementById(item.column);
      const newItem = document.createElement('div');
      newItem.className = 'item';
      newItem.id = item.id;
      newItem.innerHTML = `
    <div class="item-header"> 
      <span class="text" contenteditable="true">Untitled</span>
      <button class="delete">X</button>
    </div>
  `;
      newItem.draggable = true;
      newItem.addEventListener('dragstart', drag);
      column.appendChild(newItem);

      // Thêm sự kiện click cho nút xóa của phần tử
      const deleteButton = newItem.querySelector('.delete');
      deleteButton.addEventListener('click', (e) => {
        const item = e.target.closest('.item');
        item.remove();
        saveData();
      });
    });
  }
}

// Lưu trữ dữ liệu khi người dùng thay đổi vị trí phần tử kanban hoặc nội dung
const itemColumns = document.querySelectorAll('.column');
itemColumns.forEach(column => {
  column.addEventListener('mouseup', saveData);
});

// Tải dữ liệu kanban lưu trữ từ localStorage khi trang được tải
window.addEventListener('load', loadData);

window.addEventListener('beforeunload', saveData);