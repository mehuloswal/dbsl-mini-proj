const express = require("express");
const app = new express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/db");
const { createRouter } = require("./router/create.route.js");
const { utilsRouter } = require("./router/utils.route");
const cors = require("cors");
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/create", createRouter);
app.use("/api/utils", utilsRouter);
app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
