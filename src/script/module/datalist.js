const datalist = document.querySelector("#category-list");

async function category() {
  const res = await fetch("https://elegant-proud-car.glitch.me/api/categories");
  const data = await res.json();
  console.log("data: ", data);

  data.forEach((item) => {
    const categoryOption = document.createElement("option");
    categoryOption.value = item;

    datalist.append(categoryOption);
  });
}

category();