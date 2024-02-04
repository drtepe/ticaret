const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const modal = document.querySelector(".modal-wrapper");
const openBtn = document.querySelector("#open-btn");
const closeBtn = document.querySelector("#close-btn");
const modalList = document.querySelector(".modal-list");
const modalInfo = document.querySelector("#modal-info");

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
      data.slice(0, 30).forEach((item) => {
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
        // oluşan ürünü htmldeki listeye gönderme
        productList.appendChild(productDiv);
      })
    );
}
//sepet
let basket = [];
let total = 0;
//sepete ekleme işlemi
function addToBasket(product) {
  //sepette bu eleman varsa onu değişkene aktar
  const foundItem = basket.find((basketItem) => basketItem.id === product.id);
  //sepette ürün varsa uyarı ver
  if (foundItem) {
    //ürün varsa miktarını arttır
    foundItem.amount++;
  } //ürün yokdsa sepete ekle
  else {
    basket.push(product);
  }
}

//açma ve kapatma
openBtn.addEventListener("click", () => {
  modal.classList.add("active");
  //sepete ürün listeleme
  addList();
  modalInfo.innerText = total;
});
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  //sepeti kapatınca içini temizleme
  modalList.innerHTML = "";
  total = 0;
});
//sepette listeleme
function addList() {
  basket.forEach((product) => {
    //sepet dizisindeki her obje için div oluşturma
    const listItem = document.createElement("div");
    //bunlara klas ekle
    listItem.classList.add("list-item");
    //içeriğini değğiştir.
    listItem.innerHTML = `<img src="${product.img}" alt="" />
    <h2>${product.title}</h2>
    <h2 class="price">${product.price}$</h2>
    <p>miktar:${product.amount}</p>
    <button id="del" onclick="deleteItem({id:${product.id},price:${product.price} ,amount: ${product.amount}})">Sil</button>`;
    //elemanı listeye gönderme
    modalList.appendChild(listItem);
    total += product.price * product.amount;
  });
}
function deleteItem(deletingItem) {
  basket = basket.filter((i) => i.id !== deletingItem.id);
  //silinen elemanın fiyatını totalden çıkarma
  total -= deletingItem.price * deletingItem.amount;
  modalInfo.innerText = total;
}
//elemanı html den kaldırma
modalList.addEventListener("click", (e) => {
  if (e.target.id === "del") {
    e.target.parentElement.remove();
  }
});

//dışarda herhangi bir yere tıklandığında kapatma
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    modal.classList.remove("active");
  }
});
