// Заголовок модального окна
const modalTitle = document.querySelector(".modal__title");

// Форма внутри модального окна
const modalForm = document.querySelector(".modal__form");

// Чекбокс
const checkbox = document.querySelector(".modal__checkbox");

// Поле рядом с чекбоксом
const fieldNearCheckbox = document.querySelector(".modal__input_discount");

console.log(modalTitle);

function createRow(obj) {
  const row = `     <tr>
  <td class="table__cell">${obj.id}</td>
  <td class="table__cell table__cell_left table__cell_name" data-id="${obj.dataId}">
    <span class="table__cell-id">id: ${obj.dataId}</span>
    ${obj.name}
  </td>
  <td class="table__cell table__cell_left">${obj.category}</td>
  <td class="table__cell">${obj.unit}</td>
  <td class="table__cell">${obj.quantity}</td>
  <td class="table__cell">${obj.unitPrice}</td>
  <td class="table__cell">${obj.totalPrice}</td>
  <td class="table__cell table__cell_btn-wrapper">
    <button class="table__btn table__btn_pic"></button>
    <button class="table__btn table__btn_edit"></button>
    <button class="table__btn table__btn_del"></button>
  </td>
</tr>`;

  return row;
}
const myObject = {
  id: 1,
  dataId: "24601654816512",
  name: "Навигационная система Soundmax1",
  category: "Техника для дома",
  unit: "шт",
  quantity: 5,
  unitPrice: "$100",
  totalPrice: "$500",
};

// const rowHtml = createRow(myObj);
// console.log("rowHtml: ", rowHtml);

function renderGoods(goodsArray) {
  const tableBody = document.querySelector(".table__body");

  goodsArray.forEach((item) => {
    //структура html в виде строки
    const rowHTML = createRow(item);

    // Создаем  элемент (tr) для вставки строки в  HTML
    const tempDiv = document.createElement("tr");
    tempDiv.innerHTML = rowHTML;

    // Вставляем строку в таблицу
    tableBody.append(tempDiv);
  });
}

const goodsArray = [
  {
    id: 1,
    dataId: "24601654816512",
    name: "Навигационная система Soundmax",
    category: "Техника для дома",
    unit: "шт",
    quantity: 5,
    unitPrice: "$100",
    totalPrice: "$500",
  },
];

renderGoods(goodsArray);
