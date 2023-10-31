const goodsArray = [1, 2, 3, 4, 5, 6, 7];

const indexToRemove = 2;
goodsArray.splice(indexToRemove, 1); //откуда удаляем, сколько

// // Обновляем номера элементов
for (let i = indexToRemove; i < goodsArray.length; i++) {
  console.log("indexToRemove: ", i);
  goodsArray[i]--;
  console.log("goodsArray: ", goodsArray);
}

//функция reduce
function calculateTotalPrice() {
  return goodsArray.reduce((acc, obj) => {
    return acc + obj.price * obj.count * (1 - obj.discount / 100);
  }, 0);
}
