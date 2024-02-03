const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");

document.addEventListener("DOMContentLoaded", () => {
  // callback > içerisinde farklı fonksiyonlar çalıştırır
  fetchCategories();
  fetchProduct();
});

function fetchCategories() {
  // veri çekme isteği atma
  fetch("https://api.escuelajs.co/api/v1/categories")
    // gelen veriyi işleme
    .then((res) => res.json())
    // işlenen veriyi foreach ile herbir obje için ekrana basma
    .then((data) =>
      data.slice(0, 4).forEach((category) => {
        const { image, name } = category;
        // gelen herbir obje için div oluşturma
        const categoryDiv = document.createElement("div");
        // dive class ekleme
        categoryDiv.classList.add("category");
        // divin içeriğini değiştirme
        categoryDiv.innerHTML = `
            <img src="${image}" />
            <span>${name}</span>
        `;
        // oluşan divi htmldeki listeye atma
        categoryList.appendChild(categoryDiv);
      })
    );
}

// Ürünleri Çekme
function fetchProduct() {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    // işlenen veriyi al ve ekrana bas
    .then((data) =>
      data.slice(0, 25).forEach((item) => {
        // div oluştur
        const productDiv = document.createElement("div");
        // dive class ekle
        productDiv.classList.add("product");
        // divin içeriğini değiştir
        productDiv.innerHTML = `
            <img src="${item.images[0]}" />
            <p>${item.title}</p>
            <p>${item.category.name}</p>
            <div class="product-action">
              <p>${item.price} $</p>
              <button onclick="addToBasket({id:${item.id},title:'${item.title}',price:${item.price},img:'${item.images[0]}', amount:1})">Sepete Ekle</button>
            </div>
        `;
        console.log(item.images);
        // oluşan ürünü htmldeki listeye gönderme
        productList.appendChild(productDiv);
      })
    );
}
