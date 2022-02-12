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
      return output;
    })
    .catch((err) => console.log(err));
}

module.exports = { createCSV };
