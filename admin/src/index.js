const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const request = require("request");
const { generateUserHoldingsReport } = require("./services/commandService");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));

app.get("/investments/:id", (req, res) => {
  const { id } = req.params;
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e);
      res.send(500);
    } else {
      res.send(investments);
    }
  });
});

/**
 * @description Generates an investment report of all user holdings.
 */
app.post("/investments/generate-report", async (req, res) => {
  try {
    const result = await generateUserHoldingsReport();

    if (result.success) {
      res.send(result);
      return;
    }

    res.status(400).send(result);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "An error occurred whilst generating the holdings report." });
  }
});

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err);
    process.exit(1);
  }
  console.log(`Server running on port ${config.port}`);
});
