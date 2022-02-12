const util = require("util");
const request = require("request");

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


module.exports = { getAllUserHoldings };
