const axios = require("axios");

const config = require("config");

async function getFinancialCompanies() {
  return await axios
    .get(`${config.financialCompaniesUrl}/companies`)
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((err) => {
      console.error(err);
      return { success: false, message: "Failed to post investments report." };
    });
}

module.exports = { getFinancialCompanies };
