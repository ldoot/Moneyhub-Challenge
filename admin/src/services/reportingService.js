/**
 * @description Formats an array of user holdings into an array structure representing the value of each holding per user.
 *
 * @param {Array<object>} holdings
 * @param {} financialCompanies
 */
function formatHoldingsForInvestmentsExport(holdings, financialCompanies) {
  let output = [];

  holdings.forEach((singleUserHoldings) => {
    singleUserHoldings.holdings.forEach((holding) => {
      let holdingCompany = financialCompanies.filter((company) => company.id === holding.id)[0] || {};

      output.push([
        singleUserHoldings.userId,
        singleUserHoldings.firstName,
        singleUserHoldings.lastName,
        singleUserHoldings.date,
        holdingCompany.name || undefined,
        singleUserHoldings.investmentTotal * holding.investmentPercentage,
      ]);
    });
  });

  return output;
}

module.exports = { formatHoldingsForInvestmentsExport };
