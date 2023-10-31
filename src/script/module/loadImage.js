const imagePreview = document.querySelector(".image_upload");
const imageInput = document.querySelector(".modal__file");

imageInput.addEventListener("change", async () => {
  const file = imageInput.files[0];

  //1 mb = 1024 * 1024 bytes
  if (file.size > 1024 * 1024) {
    imagePreview.textContent = "Изображение не должно превышать размер 1 Мб";
    imagePreview.style.color = "red";
  } else {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      imagePreview.innerHTML = "";
      imagePreview.append(img);
    };
    reader.readAsDataURL(file);
    //преобразования их в строку base64 с помощью readAsDataURL, reader.result будет содержать строку base64, представляющую содержимое файла

    imagePreview.textContent = "";
  }
});
