const express = require("express");
const app = express();
const port = 3000;

app.get("/user", (req, res) => res.send("Hello Bulls!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
