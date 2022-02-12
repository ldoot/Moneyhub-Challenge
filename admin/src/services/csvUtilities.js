const { stringify } = require("csv-stringify");
const util = require("util");

const stringifyAsync = util.promisify(stringify);

/**
 * @description Generates CSV from an array of inputs arrays.
 *
 * @param {Array<Array<string>>} inputs - Array of rows to generate to CSV format.
 */
async function createCSV(inputs) {
  return await stringifyAsync(inputs)
    .then((output) => {
      return { success: true, data: output };
    })
    .catch((err) => {
      console.log(err);
      return { success: false, message: "Failed to generate CSV." };
    });
}

module.exports = { createCSV };
