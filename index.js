#!/usr/bin/env node
const chalk = require("chalk");
const axios = require("axios");
const { getCode, getName } = require("country-list");

let args = process.argv.slice(2);
let country = args[0] || "";
let currentYear = args[1] || new Date().getFullYear();
let countryCode = getCode(country);
if (countryCode == undefined) {
  console.log("Sorry, this country is not available !");
} else {
  console.log(
    "Holidates in " +
      chalk.red(country) +
      " for the year " +
      chalk.blue(currentYear) +
      ":\n"
  );
  getholidays();
}

async function getholidays() {
  try {
    const response = await axios.get(
      "https://date.nager.at/Api/v2/PublicHolidays/" +
        currentYear +
        "/" +
        countryCode
    );

    for (const item of response.data) {
      console.log(chalk.green(item.date) + " : " + item.name);
    }
  } catch (error) {
    console.error(error);
  }
}
