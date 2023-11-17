const express = require("express");
const puppeteer = require("puppeteer");
const nock = require("nock");
const axios = require("axios");
const testData_fromFile = require("./testData.js");

const port = process.env.PORT || 1981;
const collector_service_url =
  process.env.COLLECTOR_URL || "http://localhost:1980";
const app = express();

app.set("view engine", "ejs");

// set the static content folder for express
app.use(express.static("views"));

// load data from external service (data collector or database)
async function fillreportData(token_endpoint) {
  // => mock requests for now !!!!
  // test data
  // !!!! DEBUG !!!!
  const scope = nock(collector_service_url)
    .get(token_endpoint)
    .reply(200, testData_fromFile);

  const res = await axios.get(collector_service_url + token_endpoint);

  const req_data = res.data;
  console.log("fillreportData:");
  console.log(req_data);
  return req_data;
}

async function printPDF(token_endpoint) {
  html_page = "http://localhost:" + port + token_endpoint;
  const dateTimeObject = new Date();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(html_page, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4" });
  // We use pdf function to generate the pdf in the same folder as this file.
  //await page.pdf({
  //  path: "eth_report_" + dateTimeObject.getMilliseconds + ".pdf",
  //   format: "A4",
  // });

  await browser.close();

  return pdf;
}

//route for root request
app.get("/", (req, res) => {
  const dateTimeObject = new Date();
  res.send(
    "Welcome to vm reporting producer backend stateless Node.js service!<BR> Time: " +
      dateTimeObject.toTimeString()
  );
});

//route for eth page
app.get("/eth", (req, res) => {
  fillreportData("/eth").then((reportData) => {
    console.log("app get handler:");
    console.log(reportData);

    res.render("ethereum_form", {
      reportData: reportData,
    });
  });
});

//route for eth page as PDF
app.get("/eth/pdf", (req, res) => {
  printPDF("/eth").then((pdf) => {
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);
  });

  //res.send("work completed");
});

app.listen(port, () => {
  console.log(`service listening at port ${port}`);
});
