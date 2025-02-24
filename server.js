const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Haftex",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Połączono z bazą danych!");
});

app.post("/dodaj", (req, res) => {
  const { nazwa, miesiac, ilosc, cena, suma, rok, dbInfo } = req.body;
  const productsTable =
    "INSERT INTO produkty (nazwa_produktu, miesiac, ilosc, cena, suma, rok) VALUES (?, ?, ?, ?, ?, ?)";
  const expensesTable =
    "INSERT INTO koszty (nazwa_produktu, miesiac, ilosc, cena, suma, rok) VALUES (?, ?, ?, ?, ?, ?)";

  if (dbInfo === "Product") {
    if (
      !nazwa ||
      !miesiac ||
      ilosc == null ||
      cena == null ||
      suma == null ||
      rok == null
    ) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane!" });
    }

    if (
      isNaN(ilosc) ||
      isNaN(cena) ||
      isNaN(suma) ||
      ilosc <= 0 ||
      cena <= 0 ||
      suma <= 0 ||
      rok <= 0
    ) {
      return res
        .status(400)
        .json({ error: "Ilość, cena i suma muszą być liczbami dodatnimi!" });
    }

    db.query(productsTable, [nazwa, miesiac, ilosc, cena, suma, rok], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Błąd podczas dodawania produktu" });
      }
      res.json({ message: "Produkt dodany pomyślnie!" });
    });
  } else if (dbInfo === "Expenses") {
    if (
      !nazwa ||
      !miesiac ||
      ilosc == null ||
      cena == null ||
      suma == null ||
      rok == null
    ) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane!" });
    }

    if (
      isNaN(ilosc) ||
      isNaN(cena) ||
      isNaN(suma) ||
      ilosc <= 0 ||
      cena <= 0 ||
      suma <= 0 ||
      rok <= 0
    ) {
      return res
        .status(400)
        .json({ error: "Ilość, cena i suma muszą być liczbami dodatnimi!" });
    }

    db.query(expensesTable, [nazwa, miesiac, ilosc, cena, suma, rok], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Błąd podczas dodawania kosztów" });
      }
      res.json({ message: "Produkt dodany pomyślnie!" });
    });
  } else {
    return res.status(404).json({ error: "Błąd przy wyborze bazy danych" });
  }
});

app.get("/produkty", (req, res) => {
  db.query("SELECT * FROM produkty ORDER BY id DESC LIMIT 5;", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Błąd podczas pobierania produktów" });
    }
    res.json(results);
  });
});

app.get("/koszty", (req, res) => {
  db.query("SELECT * FROM koszty ORDER BY id DESC LIMIT 5;", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Błąd podczas pobierania produktów" });
    }
    res.json(results);
  });
});

app.post("/zysk", (req, res) => {
  let query;
  const { monthOfIncome, yearOfIncome } = req.body;

  const values = [];

  if (!monthOfIncome && !yearOfIncome) {
    query = `
        SELECT 'koszty' AS typ, SUM(suma) AS suma FROM koszty
        UNION
        SELECT 'produkty', SUM(suma) FROM produkty
      `;
  } else if (!monthOfIncome && yearOfIncome) {
    query = `
        SELECT 'koszty' AS typ, SUM(suma) AS suma FROM koszty WHERE rok = ?
        UNION
        SELECT 'produkty', SUM(suma) FROM produkty WHERE rok = ?
      `;
    values.push(monthOfIncome, yearOfIncome);
  } else {
    query = `
        SELECT 'koszty' AS typ, SUM(suma) AS suma FROM koszty WHERE miesiac = ? AND rok = ?
        UNION
        SELECT 'produkty', SUM(suma) FROM produkty WHERE miesiac = ? AND rok = ?
      `;
    values.push(monthOfIncome, yearOfIncome, monthOfIncome, yearOfIncome);
  }

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Błąd zapytania do bazy danych" });
    }

    const response = {
      koszty: results.find((row) => row.typ === "koszty")?.suma || 0,
      produkty: results.find((row) => row.typ === "produkty")?.suma || 0,
    };
    console.log(response);
    res.json(response);
  });
});

app.listen(3001, () => {
  console.log("Serwer działa na porcie 3001");
});
