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
  <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
    <span class="table__cell-id">id: ${obj.id}</span>
    ${obj.title}
  </td>
  <td class="table__cell table__cell_left">${obj.category}</td>
  <td class="table__cell">${obj.units}</td>
  <td class="table__cell">${obj.count}</td>
  <td class="table__cell">${obj.price}</td>
  <td class="table__cell">${obj.price}</td>
  <td class="table__cell table__cell_btn-wrapper">
    <button class="table__btn table__btn_pic"></button>
    <button class="table__btn table__btn_edit"></button>
    <button class="table__btn table__btn_del"></button>
  </td>
</tr>`;

  return row;
}
// const myObject = {
//   id: 1,
//   dataId: "24601654816512",
//   name: "Навигационная система Soundmax1",
//   category: "Техника для дома",
//   unit: "шт",
//   quantity: 5,
//   unitPrice: "$100",
//   totalPrice: "$500",
// };

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

  return {
    tableBody,
  };
}

let goodsArray = [
  {
    id: 1,
    title: "Смартфон Xiaomi 11T 8/128GB",
    price: 27000,
    description:
      "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    category: "mobile-phone",
    discont: false,
    count: 3,
    units: "шт",
    images: {
      small: "img/smrtxiaomi11t-m.jpg",
      big: "img/smrtxiaomi11t-b.jpg",
    },
  },
  {
    id: 2,
    title: "Радиоуправляемый автомобиль Cheetan",
    price: 4000,
    description:
      "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    category: "toys",
    discont: 5,
    count: 1,
    units: "шт",
    images: {
      small: "img/cheetancar-m.jpg",
      big: "img/cheetancar-b.jpg",
    },
  },
  {
    id: 3,
    title: "ТВ приставка MECOOL KI",
    price: 12400,
    description:
      "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    category: "tv-box",
    discont: 15,
    count: 4,
    units: "шт",
    images: {
      small: "img/tvboxmecool-m.jpg",
      big: "img/tvboxmecool-b.jpg",
    },
  },
  {
    id: 4,
    title: "Витая пара PROConnect 01-0043-3-25",
    price: 22,
    description:
      "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    category: "cables",
    discont: false,
    count: 420,
    units: "v",
    images: {
      small: "img/lan_proconnect43-3-25.jpg",
      big: "img/lan_proconnect43-3-25-b.jpg",
    },
  },
];

const { tableBody } = renderGoods(goodsArray);

const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".panel__add-goods");

btn.addEventListener("click", () => {
  overlay.classList.add("active");
});

overlay.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("overlay") || target.closest(".modal__close")) {
    overlay.classList.remove("active");
  }
});

// const overlay__modal_modal = document.querySelector(".overlay__modal.modal");
// overlay__modal_modal.addEventListener("click", (event) => {
//   event.stopPropagation();
// });

//крестик
// const modal__close = document.querySelector(".modal__close");
// modal__close.addEventListener("click", () => {
//   overlay.classList.remove("active");
// });

const cms = document.querySelector(".table__body ");
cms.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".table__btn_del")) {
    const tr = target.closest("tr");
    const data = tr.querySelector(".table__cell_name");
    const id = data.dataset.id;
    goodsArray = goodsArray.filter((el) => el.id != id);
    console.log(goodsArray);

    target.closest("tr").remove();
    cmsTotalPrce();
  }
});

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    fieldNearCheckbox.disabled = false;
  } else {
    fieldNearCheckbox.value = "";
    fieldNearCheckbox.disabled = true;
  }
});

function addContactPage(obj, tableBody) {
  const rowHTML = createRow(obj);
  const tempDiv = document.createElement("tr");
  tempDiv.innerHTML = rowHTML;

  tableBody.append(tempDiv);
}

//Функция редьюсер (считает сумму из массива obj)
function reducerSum() {
  const sum = goodsArray.reduce((acc, obj) => {
    return acc + obj.price * obj.count;
  }, 0);
  console.log("sum", sum);
  return sum;
}

//цена на главной странице
function cmsTotalPrce() {
  const cms__totalPrice = document.querySelector(".cms__total-price");
  cms__totalPrice.textContent = reducerSum();
}
cmsTotalPrce();

function formControl(tableBody) {
  const form = document.querySelector(".modal__form");
  console.log(form);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = goodsArray.length + 1;
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData);
    obj.id = id;
    goodsArray.push(obj);
    addContactPage(obj, tableBody);
    console.log("goodsArray: ", goodsArray);

    reducerSum();
    cmsTotalPrce();

    form.reset();
    overlay.classList.remove("active");
  });
}
formControl(tableBody);

//Кликаем по кнопки и меняется id формы и выводим сумму.
const overlay_modal_button = document.querySelector(".panel__add-goods");
overlay_modal_button.addEventListener("click", () => {
  const form_id = document.querySelector(".vendor-code__id");
  form_id.textContent = goodsArray.length + 1;
});

const modal__totalPrice = document.querySelector(".modal__total-price");
modal__totalPrice.textContent = 0;
const count = document.getElementById("count");
const price = document.getElementById("price");

function updateTotalPrice() {
  const newPrice = parseFloat(price.value);
  const newCount = parseFloat(count.value);

  if (!isNaN(newPrice) && !isNaN(newCount)) {
    const totalPrice = newPrice * newCount;
    modal__totalPrice.textContent = totalPrice + "$";
  }
}

price.addEventListener("input", updateTotalPrice);
count.addEventListener("input", updateTotalPrice);

const tr = document.querySelectorAll(".table__body tr");
tr.forEach((el) => {
  const td = el.querySelectorAll("td.table__cell");
  const count = td[4];
  const price = td[5];

  const totalPrice = (td[6].textContent =
    price.textContent * count.textContent);
});
