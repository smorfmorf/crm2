const datalist = document.querySelector("#category-list");

async function category() {
  const res = await fetch("http://localhost:3000/api/categories");
  const data = await res.json();

  data.forEach((item) => {
    const categoryOption = document.createElement("option");
    categoryOption.value = item;

    datalist.append(categoryOption);
  });
}

category();
