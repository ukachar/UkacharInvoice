const express = require("express");
const port = process.env.PORT || 5000;
const app = express();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

app.post("/formPost", (req, res) => {
  console.log(req.body);
});

//Dohvacanje datuma za ponudu
const date = new Date();
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];
const [hour, minutes, seconds] = [
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];

const maticnaTvrtka = require("./reqData/mothInfo.json");
const tvrtka = require("./reqData/clientinfo.json");

const easyinvoice = require("easyinvoice");
const fs = require("fs");

const data = {
  client: {
    company: `${tvrtka.client.company}`,
    address: `${tvrtka.client.address}`,
    zip: `${tvrtka.client.zip}`,
    city: `${tvrtka.client.city}`,
    country: `${tvrtka.client.country}`,
  },

  sender: {
    company: `${maticnaTvrtka.sender.company}`,
    address: `${maticnaTvrtka.sender.address}`,
    zip: `${maticnaTvrtka.sender.zip}`,
    city: `${maticnaTvrtka.sender.city}`,
    country: `${maticnaTvrtka.sender.country}`,
    OIB: `${maticnaTvrtka.sender.oib}`,
  },

  //      Offcourse we would like to use our own logo on this invoice. There are a few ways to do this.
  // 1.   Use a url
  images: {
    // The logo on top of your invoice
    logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
  },
  // 2.   Read from a local file as base64
  //      logo: fs.readFileSync('logo.png', 'base64'),

  information: {
    // Invoice number
    number: `${year}.0001`,
    // Invoice data
    date: `${day}.${month}.${year}`,
  },
  products: [
    {
      quantity: "2",
      description: "Test1",
      tax: 6,
      price: 33.87,
    },
    {
      quantity: "4",
      description: "Test2",
      tax: 21,
      price: 10.45,
    },
  ],

  marginTop: 25,
  marginRight: 25,
  marginLeft: 25,
  marginBottom: 25,

  translate: {
    invoice: "Ponuda",
    number: "Broj ponude",
    date: "Datum ponude",
    "due-date": "Datum važenja",
    invoiceNumber: "Broj ponude",
    invoiceDate: "Datum ponude",
    products: "Proizvod",
    quantity: "Količina",
    price: "Cijena",
    subtotal: "Osnovica",
    "product-total": "Iznos",
    total: "Ukupno",
  },

  products: [
    {
      quantity: 2,
      description: "Product 1",
      "tax-rate": 25,
      price: 33.87,
    },
    {
      quantity: 4.1,
      description: "Product 2",
      "tax-rate": 25,
      price: 12.34,
    },
    {
      quantity: 4.5678,
      description: "Product 3",
      "tax-rate": 25,
      price: 6324.45,
    },
  ],
  "bottom-notice": "Ukoliko Vam ponuda odgovara...",
  settings: {
    currency: "HRK",
    locale: "hr-HR",
    "tax-notation": "PDV",
    format: "A4",
  },
};

easyinvoice.createInvoice(data, function (result) {
  const pdf = result.pdf;
  fs.writeFileSync("invoice.pdf", pdf, "base64");
});

/*
const nazivTvrtke = document.getElementById("nazivTvrtke");
const adresa = document.getElementById("adresa");
const mjesto = document.getElementById("mjesto");
const drzava = document.getElementById("drzava");
const tvrtkaoib = document.getElementById("oib");
const pbroj = document.getElementById("pbroj");
const spremKupca = document.getElementById("spremKupca");

spremKupca.addEventListener("click", function () {
  console.log("blabla");
  const customer = {
    client: {
      company: `${nazivTvrtke.value}`,
      address: `${adresa.value}`,
      zip: `${pbroj.value}`,
      city: `${mjesto.value}`,
      country: `${drzava.value}`,
      oib: `${tvrtkaoib.value}`,
    },
  };

  const jsonString = JSON.stringify(customer);
  fs.writeFile("test.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});
*/
