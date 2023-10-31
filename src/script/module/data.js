//data.js
import { initTable, cmsTotalPrce } from "./table.js";
import { sub_pages, sub_choice_pages } from "./Elements.js";
// let goodsArray = [
//   {
//     id: 1,
//     title: "Смартфон Xiaomi 11T 8/128GB",
//     price: 27000,
//     description:
//       "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
//     category: "mobile-phone",
//     discont: false,
//     count: 3,
//     units: "шт",
//     images: {
//       small: "img/smrtxiaomi11t-m.jpg",
//       big: "img/smrtxiaomi11t-b.jpg",
//     },
//   },
// ];

let goodsArray = [];
let lengthArray;

//при первом рендере
let page = 0; // page idvalue
let pages = 0; //pages

function returnArray() {
  fetch("http://localhost:3000/api/goods")
    .then((res) => res.json())
    .then((data) => {
      page = data.page;
      pages = data.pages;

      console.log("data: ", data);
      goodsArray = data.goods;
      console.log("goodsArray: ", goodsArray);

      if (goodsArray && goodsArray.length > 0) {
        goodsArray.forEach((item, index) => {
          // item.price = (item.price * (1 - item.discount / 100)).toFixed();
          item.NumberId = index + 1;
        });

        lengthArray = goodsArray.length;

        sub_pages.textContent = `${goodsArray[0].NumberId}-${
          goodsArray[lengthArray - 1].NumberId
        } из ${data.totalCount}`;

        sub_choice_pages.textContent = `Показывать на странице: ${lengthArray}`;
      } else {
        // Обработка случая, когда goodsArray пуст или не существует
        sub_pages.textContent = "Нет данных";
        sub_choice_pages.textContent = "Показывать на странице: 0";
      }
      initTable();
    });
}

returnArray();

function addGoods(obj, id) {
  obj.id = id;
  const maxOrder = goodsArray.reduce(
    (max, item) => (item.NumberId > max ? item.NumberId : max),
    0
  );
  obj.NumberId = maxOrder + 1;

  goodsArray.push(obj);
}

function removeGoodsById(id) {
  // goodsArray = goodsArray.filter((el) => el.NumberId !== id);

  const indexToRemove = goodsArray.findIndex((el) => el.NumberId === id);
  goodsArray.splice(indexToRemove, 1); //с какого удаляем, сколько
  // Обновляем номера элементов
  for (let i = indexToRemove; i < goodsArray.length; i++) {
    goodsArray[i].NumberId--;
  }

  initTable();
  cmsTotalPrce();
}

export { goodsArray, addGoods, removeGoodsById };

//!
window.addEventListener("click", () => {
  console.log("goodsArray:Click ", goodsArray);
});
console.log("module");

//*Search
const input = document.querySelector(".panel__input");
let id;
input.addEventListener("input", ({ target }) => {
  clearTimeout(id);

  id = setTimeout(() => {
    const value = target.value;
    console.log("value: ", value);

    if (value) {
      goodsArray = goodsArray.filter((good) => good.title.includes(value));

      goodsArray.forEach((item, index) => {
        item.price = (item.price * (1 - item.discount / 100)).toFixed();
        item.NumberId = index + 1;
      });

      console.log("goodsArray: ", goodsArray);
      initTable();
    } else {
      returnArray();
    }

    // fetch(`http://localhost:3000/api/goods/${value}`)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("http error_search: " + res.status);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     goodsArray = [data];
    //     goodsArray.forEach((item, index) => {
    //       return (item.NumberId = index + 1);
    //     });

    //     initTable();
    //     if (!input.value) {
    //       goodsArray = data.goods;
    //       goodsArray.forEach((item, index) => {
    //         return (item.NumberId = index + 1);
    //       });
    //       initTable();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error: " + error);
    //   });
  }, 300);
});

//!
let coutID = 1;
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

next.addEventListener("click", () => {
  console.log("page", page);
  console.log("pages", pages);

  page++;
  if (page <= pages) {
    fetch(`http://localhost:3000/api/goods?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        page = data.page;
        pages = data.pages;
        console.log("DATA_page: ", page);
        console.log("DATA_pages: ", pages);
        console.log("DATA_data: ", data);

        coutID = data.page - 1;
        coutID = 10 * coutID + 1;

        goodsArray = data.goods;

        goodsArray.forEach((item, index) => {
          // item.price = (item.price * (1 - item.discount / 100)).toFixed();
          item.NumberId = index + coutID;
        });

        lengthArray = goodsArray.length;
        sub_pages.textContent = `${goodsArray[0].NumberId}-${
          goodsArray[lengthArray - 1].NumberId
        } из ${data.totalCount}`;

        sub_choice_pages.textContent = `Показывать на странице: ${lengthArray}`;
        initTable();
      });
  } else {
    console.log("страница не существует");
    page--;
  }
});

prev.addEventListener("click", () => {
  page--;
  console.log("page: ", page);
  if (page === -1 || page === 0) {
    page = 1;
    console.log("page: = 1 ", page);
  }

  fetch(`http://localhost:3000/api/goods?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      goodsArray = data.goods;

      coutID = data.page - 1;
      coutID = 10 * coutID + 1;
      if (coutID === 0) coutID = 1;

      goodsArray.forEach((item, index) => {
        // item.price = (item.price * (1 - item.discount / 100)).toFixed();
        item.NumberId = index + coutID;
      });

      lengthArray = goodsArray.length;
      sub_pages.textContent = `${goodsArray[0].NumberId}-${
        goodsArray[lengthArray - 1].NumberId
      } из ${data.totalCount}`;

      sub_choice_pages.textContent = `Показывать на странице: ${lengthArray}`;
      initTable();
    });
});
