//data.js
import { initTable } from "./table.js";
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

function returnArray() {
  fetch("http://localhost:3000/api/goods")
    .then((res) => res.json())
    .then((data) => {
      console.log("data: ", data);
      goodsArray = data.goods;

      goodsArray.forEach((item, index) => {
        return (item.NumberId = index + 1);
      });

      sub_pages.textContent = `${goodsArray[0].NumberId}-${goodsArray[9].NumberId} из ${data.totalCount}`;

      lengthArray = goodsArray.length;
      sub_choice_pages.textContent = `Показывать на странице: ${lengthArray}`;

      initTable();
    });
}

returnArray();

function addGoods(obj, uniqueId) {
  obj.id = uniqueId;

  const maxOrder = goodsArray.reduce(
    (max, item) => (item.NumberId > max ? item.NumberId : max),
    0
  );
  obj.NumberId = maxOrder + 1;

  console.log(obj);
  goodsArray.push(obj);
}

function removeGoodsById(id) {
  goodsArray = goodsArray.filter((el) => el.NumberId !== id);

  goodsArray.forEach((item, index) => {
    return (item.NumberId = index + 1);
  });

  console.log("goodsArray2: ", goodsArray);

  initTable();
}

function calculateTotalPrice() {
  return goodsArray.reduce((acc, obj) => {
    return acc + obj.price * obj.count * (1 - obj.discount / 100);
  }, 0);
}

export { goodsArray, addGoods, removeGoodsById, calculateTotalPrice };

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
        return (item.NumberId = index + 1);
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

//при первом рендере
let idValue = 1;
let page = 2;
let coutID = 1;

const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

next.addEventListener("click", () => {
  idValue++;
  if (idValue === page + 1) {
    idValue--;
  }
  console.log("idValue", idValue);
  fetch(`http://localhost:3000/api/goods?page=${idValue}`)
    .then((res) => res.json())
    .then((data) => {
      page = data.pages;

      coutID = data.page - 1;
      console.log("coutID: ", coutID);
      coutID = 10 * coutID + 1;

      goodsArray = data.goods;

      goodsArray.forEach((item, index) => {
        return (item.NumberId = index + coutID);
      });

      lengthArray = goodsArray.length;
      sub_pages.textContent = `${goodsArray[0].NumberId}-${
        goodsArray[lengthArray - 1].NumberId
      } из ${data.totalCount}`;

      sub_choice_pages.textContent = `Показывать на странице: ${lengthArray}`;
      initTable();
    });
});

prev.addEventListener("click", () => {
  idValue--;
  if (idValue === -1 || idValue === 0) {
    idValue = 1;
  }

  fetch(`http://localhost:3000/api/goods?page=${idValue}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data: ", data);
      goodsArray = data.goods;

      coutID = data.page - 1;
      console.log("coutID: ", coutID);
      coutID = 10 * coutID + 1;
      if (coutID === 0) coutID = 1;

      goodsArray.forEach((item, index) => {
        return (item.NumberId = index + coutID);
      });

      lengthArray = goodsArray.length;
      sub_pages.textContent = `${goodsArray[0].NumberId}-${
        goodsArray[lengthArray - 1].NumberId
      } из ${data.totalCount}`;

      sub_choice_pages.textContent = `Показывать на странице: ${lengthArray}`;
      initTable();
    });
});
