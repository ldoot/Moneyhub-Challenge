const util = require("util");
const request = require("request");
const axios = require("axios");

const config = require("config");
const getAsync = util.promisify(request.get);

/**
 * @description Retrieves all user holdings from the investments service.
 */
async function getAllUserHoldings() {
  return await getAsync(`${config.investmentsServiceUrl}/investments`)
    .then((response) => {
      return { success: true, data: response.body };
    })
    .catch((err) => {
      console.error(err);
      return { success: false, message: "Failed to query investments service for holdings." };
    });
}

/**
 *
 * @description Export an investments report to the investments service.
 */
async function postInvestmentsReport(investmentReport) {
  return await axios
    .post(`${config.investmentsServiceUrl}/investments/export`, { investmentReport })
    .then((response) => {
      return { success: true };
    })
    .catch((err) => {
      console.error(err);
      return { success: false, message: "Failed to post investments report." };
    });
}

module.exports = { getAllUserHoldings, postInvestmentsReport };
