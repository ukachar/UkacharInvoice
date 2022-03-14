//SERVER START
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const maticnaTvrtka = require("./reqData/mothInfo.json");
const tvrtka = require("./reqData/clientinfo.json");
const easyinvoice = require("easyinvoice");
const fs = require("fs");

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded());

// Define the static file path
app.use(express.static(__dirname + "/public"));
/*
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/formPost", (req, res) => {
  console.log(req.body);
});
*/
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
  /*res.send(`<form method="POST" action="/">
  <input type="text" name="username" placeholder="username">
  <input type="submit">
</form>`);*/
});

/** Process POST request */
app.post("/step", function (req, res) {
  res.sendFile(__dirname + "/public/offer.html");

  function writeClient() {
    const jsonString = JSON.stringify(req.body);
    fs.writeFile("reqData/clientinfo.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  }

  writeClient();
});

app.post("/step2", (req, res) => {
  //res.send(`<h1>Šljaka</h1>`);
  //res.send(req.body);
  /*function writeArticles() {
    const jsonString = JSON.stringify(req.body);
    fs.writeFile("reqData/articles.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  }
  writeArticles();*/

  //console.log(req.body.description[1]);

  let arej = [];
  const duljina = Object.values(req.body.description).length;

  for (let i = 0; i < duljina; i++) {
    let a = {
      quantity: req.body.quantity[i],
      description: req.body.description[i],
      "tax-rate": req.body.tax[i],
      price: req.body.price[i],
    };

    arej.push(a);
  }

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

  const data = {
    customize: {
      template: fs.readFileSync("reqData/template.html", "base64"), // Must be base64 encoded html
    },

    client: {
      company: `${tvrtka.company}`,
      address: `${tvrtka.address}`,
      zip: `${tvrtka.zip}`,
      city: `${tvrtka.city}`,
      country: `${tvrtka.drzava}`,
      custom1: `OIB: ${tvrtka.oib}`,
    },

    sender: {
      company: `${maticnaTvrtka.sender.company}`,
      address: `${maticnaTvrtka.sender.address}`,
      zip: `${maticnaTvrtka.sender.zip}`,
      city: `${maticnaTvrtka.sender.city}`,
      country: `${maticnaTvrtka.sender.country}`,
      custom1: `OIB: ${maticnaTvrtka.sender.oib}`,
    },

    //      Offcourse we would like to use our own logo on this invoice. There are a few ways to do this.
    // 1.   Use a url
    images: {
      // The logo on top of your invoice
      logo: "http://static.ukachar.com/ukacharsinvoice/logo_crni.png",
    },
    // 2.   Read from a local file as base64
    //      logo: fs.readFileSync('logo.png', 'base64'),

    information: {
      // Invoice number
      number: `${year}.${month}.${day}.${hour}.${minutes}`,
      // Invoice data
      date: `${day}.${month}.${year}`,
    },

    marginTop: 5,
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

    "bottom-notice": "Ukoliko Vam ponuda odgovara...",
    settings: {
      currency: "HRK",
      locale: "hr-HR",
      "tax-notation": "PDV",
      format: "A4",
    },
  };

  data.products = arej;

  easyinvoice.createInvoice(data, function (result) {
    const pdf = result.pdf;
    fs.writeFileSync(`ponuda${hour}${minute}${seconds}.pdf`, pdf, "base64");
  });

  setInterval(() => {
    res.redirect("/download");
  }, 3000);
});

app.get("/download", (req, res) => {
  res.download(__dirname + "/ponuda.pdf");
  //res.sendFile(__dirname + "/public/success.html");
});

//SERVER END
