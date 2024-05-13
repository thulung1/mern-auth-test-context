require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");

const rootRouter = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.URI, credentials: true }));

app.use("/api/v1/users", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
