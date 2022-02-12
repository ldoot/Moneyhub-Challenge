const { getAllUserHoldings, postInvestmentsReport } = require("./investmentService");
const { createCSV } = require("./csvUtilities");
const { formatHoldingsForInvestmentsExport } = require("./reportingService");

/**
 * @description Generates user holdings report and dispatches it to the investments service.
 */
async function generateUserHoldingsReport() {
  console.log("Generating investments report.");

  const getInvestmentsResult = await getAllUserHoldings();

  if (!getInvestmentsResult.success || !getInvestmentsResult.data) {
    return { success: false, message: "Failed to retrieve user holdings." };
  }

  const formattedHoldings = formatHoldingsForInvestmentsExport(JSON.parse(getInvestmentsResult.data));

  const generateCSVResult = await createCSV(formattedHoldings);

  if (!generateCSVResult.success || !generateCSVResult.data) {
    return { success: false, message: "Failed to generate holdings report." };
  }

  const exportReportResult = await postInvestmentsReport(generateCSVResult.data);

  if (!exportReportResult.success) {
    return { success: false, message: "Failed to export report to investments service." };
  }

  return { success: true };
}

module.exports = { generateUserHoldingsReport };
