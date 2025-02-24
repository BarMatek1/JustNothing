document.addEventListener("DOMContentLoaded", () => {
  insertIncomes(null, null);
  downloadProducts(viewInfo);
});

const elements = {
  infoIcon: document.querySelector(".info"),
  instruction: document.querySelector(".instruction"),
  turnOffBtn: document.querySelector(".turnOffBtn"),
  addProductBtn: document.querySelector(".addProductBtn"),
  checkbox: document.querySelector("#monthYear"),
  optionalInput: document.querySelector(".optionalInput"),
  productionRadio: document.querySelectorAll(".productionRadio"),
  listRadio: document.querySelectorAll(".listRadio"),
  typeOfIncome: document.querySelectorAll(".typeOfIncome"),
  optionalIncomeInput: document.querySelector(".optionalIncomeInput"),
  searchButton: document.querySelector(".searchButton"),
};

let dbInfo = "Product";
let viewInfo = "Product";
let checked = false;

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

elements.checkbox.addEventListener("change", () => {
  checked = elements.checkbox.checked;
  elements.optionalInput.classList.toggle("optionalInput--active", checked);
});

elements.productionRadio.forEach((radio) => {
  radio.addEventListener("change", () => {
    dbInfo = radio.checked && radio.value === "Product" ? "Product" : "Expenses";
  });
});

elements.searchButton.addEventListener("click", () => {
  const yearInput = document.querySelector(".yearIncomeInput").value;
  const monthInput = document.querySelector(".monthIncomeInput").value;
  const selectedMonth = elements.typeOfIncome[2].checked ? monthInput : null;

  insertIncomes(selectedMonth, yearInput);
});

elements.typeOfIncome.forEach((radio) => {
  radio.addEventListener("change", () => {
    elements.optionalIncomeInput.classList.remove("optionalIncomeInput--active");
    document.querySelector(".monthIncomeInput").disabled = false; // Reset

    if (elements.typeOfIncome[0].checked) {
      insertIncomes(null, null);
    } else {
      elements.optionalIncomeInput.classList.add("optionalIncomeInput--active");
      document.querySelector(".monthIncomeInput").disabled =
        elements.typeOfIncome[1].checked;
    }
  });
});

elements.listRadio.forEach((radio) => {
  radio.addEventListener("change", () => {
    viewInfo = radio.value;
    document.querySelector(".heading").textContent =
      viewInfo === "Product" ? "Lista produkcji" : "Lista kosztów";
    downloadProducts(viewInfo);
  });
});

elements.addProductBtn.addEventListener("click", addProduct);

async function addProduct() {
  const nazwa = document.getElementById("nazwa").value;
  const ilosc = parseInt(document.getElementById("ilosc").value, 10);
  const cena = parseFloat(document.getElementById("cena").value).toFixed(2);
  const suma = cena * ilosc;

  miesiac = checked ? document.querySelector(".monthInput").value : currentMonth;
  rok = checked ? document.querySelector(".yearInput").value : today.getFullYear();

  await fetch("http://localhost:3001/dodaj", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nazwa, miesiac, ilosc, cena, suma, rok, dbInfo }),
  });

  downloadProducts(viewInfo);
}

async function insertIncomes(monthOfIncome, yearOfIncome) {
  try {
    const response = await fetch("http://localhost:3001/zysk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ monthOfIncome, yearOfIncome }),
    });

    if (!response.ok) throw new Error("Błąd pobierania danych");

    const data = await response.json();
    updateTable(data);
  } catch (error) {
    console.error("Błąd:", error);
  }
}

async function downloadProducts(typeOfView) {
  const endpoint = typeOfView === "Product" ? "produkty" : "koszty";
  const res = await fetch(`http://localhost:3001/${endpoint}`);
  const produkty = await res.json();

  document.getElementById("productTable").innerHTML = produkty
    .map(
      (p) => `
    <tr>
      <td>${p.nazwa_produktu}</td>
      <td>${p.miesiac}</td>
      <td>${p.ilosc}</td>
      <td>${p.cena}</td>
      <td>${p.suma}</td>
      <td>${p.rok}</td>
    </tr>
  `
    )
    .join("");
}

function updateTable(data) {
  document.querySelector(".bodyOfTable").innerHTML = `
    <tr>
      <td>${data.produkty} PLN</td>
      <td>${data.koszty} PLN</td>
      <td>${data.produkty - data.koszty} PLN</td>
    </tr>
  `;
}
