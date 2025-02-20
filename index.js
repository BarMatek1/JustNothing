const infoIcon = document.querySelector(".info");
const instruction = document.querySelector(".instruction");
const turnOffBtn = document.querySelector(".turnOffBtn");
const addProductBtn = document.querySelector(".addProductBtn");
const checkbox = document.querySelector("#monthYear");
const optionalInput = document.querySelector(".optionalInput");
const productionRadio = document.querySelectorAll(".productionRadio");
const listRadio = document.querySelectorAll(".listRadio");

let dbInfo = "Product";
let viewInfo = "Product";
let checked;

const today = new Date();
const monthNames = [
  "Styczen",
  "Luty",
  "Marzec",
  "Kwiecien",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpien",
  "Wrzesien",
  "Pazdziernik",
  "Listopad",
  "Grudzien",
];
const currentMonth = monthNames[today.getMonth()];
let miesiac = currentMonth;
let rok = today.getFullYear();

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    optionalInput.classList.add("optionalInput--active");
    checked = true;
  } else {
    optionalInput.classList.remove("optionalInput--active");
    checked = false;
  }
});

productionRadio.forEach((radio) => {
  radio.addEventListener("change", async () => {
    if (productionRadio[0].checked) {
      dbInfo = "Product";
    } else {
      dbInfo = "Expenses";
    }
  });
});

listRadio.forEach((radio) => {
  radio.addEventListener("change", async () => {
    if (listRadio[0].checked) {
      viewInfo = "Product";
      downloadProducts(viewInfo);
      document.querySelector(".heading").textContent = "Lista produkcji";
    } else {
      viewInfo = "Expenses";
      downloadProducts(viewInfo);
      document.querySelector(".heading").textContent = "Lista kosztów";
    }
  });
});

addProductBtn.addEventListener("click", addProduct);

async function addProduct() {
  const nazwa = document.getElementById("nazwa").value;
  const ilosc = document.getElementById("ilosc").value;
  const cena = document.getElementById("cena").value;
  let suma = parseFloat(cena).toFixed(2) * parseInt(ilosc);

  if (checked) {
    miesiac = document.querySelector(".monthInput").value;
    rok = document.querySelector(".yearInput").value;
  } else {
    optionalInput.classList.remove("optionalInput--active");
    miesiac = currentMonth;
    rok = today.getFullYear();
  }
  await fetch("http://localhost:3001/dodaj", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nazwa, miesiac, ilosc, cena, suma, rok, dbInfo }),
  });
  downloadProducts(viewInfo);
}

async function downloadProducts(typeOfView) {
  if (typeOfView === "Product") {
    const res = await fetch("http://localhost:3001/produkty");
    const produkty = await res.json();
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = produkty
      .map(
        (p) =>
          `<tr>
              <td>${p.nazwa_produktu}</td>
              <td>${p.miesiac}</td>
              <td>${p.ilosc}</td>
              <td>${p.cena}</td>
              <td>${p.suma}</td>
              <td>${p.rok}</td>
          </tr>`
      )
      .join("");
  } else {
    const res = await fetch("http://localhost:3001/koszty");
    const produkty = await res.json();
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = produkty
      .map(
        (p) =>
          `<tr>
              <td>${p.nazwa_produktu}</td>
              <td>${p.miesiac}</td>
              <td>${p.ilosc}</td>
              <td>${p.cena}</td>
              <td>${p.suma}</td>
              <td>${p.rok}</td>
          </tr>`
      )
      .join("");
  }
}

downloadProducts(viewInfo);
