const { getAllUserHoldings } = require("./investmentService");

/**
 * @description Generates user holdings report and dispatches it to the investments service.
 */
async function generateUserHoldingsReport() {
  console.log("Generating investments report.");

  const getInvestmentsResult = await getAllUserHoldings();

  if (!getInvestmentsResult.success) {
    return { success: false, message: "Failed to retrieve user holdings." };
  }

  return { success: true };
}

module.exports = { generateUserHoldingsReport };
