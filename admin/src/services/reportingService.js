/**
 * @description Formats an array of user holdings into an array structure representing the value of each holding per user.
 *
 * @param {Array<object>} holdings
 */
function formatHoldingsResponseForCSVCreation(holdings) {
  let output = [];

  holdings.forEach((singleUserHoldings) => {
    singleUserHoldings.holdings.forEach((holding) => {
      output.push([
        singleUserHoldings.userId,
        singleUserHoldings.firstName,
        singleUserHoldings.lastName,
        singleUserHoldings.date,
        holding.id,
        singleUserHoldings.investmentTotal * holding.investmentPercentage,
      ]);
    });
  });

  return output;
}

module.exports = { formatHoldingsResponseForCSVCreation };
