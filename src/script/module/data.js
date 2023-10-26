//data.js
import { initTable } from "./table.js";

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
//   {
//     id: 2,
//     title: "Радиоуправляемый автомобиль Cheetan",
//     price: 4000,
//     description:
//       "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
//     category: "toys",
//     discont: 5,
//     count: 1,
//     units: "шт",
//     images: {
//       small: "img/cheetancar-m.jpg",
//       big: "img/cheetancar-b.jpg",
//     },
//   },
// ];

let goodsArray = [];

function returnArray() {
  return goodsArray;
}

fetch("https://elegant-proud-car.glitch.me/api/goods")
  .then((res) => res.json())
  .then((data) => {
    goodsArray = data.goods;

    goodsArray.forEach((item, index) => {
      return (item.NumberId = index + 1);
    });

    initTable();
  });

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
    return acc + obj.price * obj.count;
  }, 0);
}

export {
  goodsArray,
  addGoods,
  removeGoodsById,
  calculateTotalPrice,
  returnArray,
};

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

  id = setTimeout(async () => {
    const value = target.value;
    console.log("value: ", value);
    fetch(`https://elegant-proud-car.glitch.me/api/goods/${value}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("http error: " + res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data === undefined) {
          console.log("false");
        } else {
          goodsArray = [data];
          initTable();
        }
      });
  }, 300);
});
