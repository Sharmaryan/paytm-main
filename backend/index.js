const express = require("express");
const paytmRouter = require("./routes");

const app = express();

app.use('/api/v1', paytmRouter)

app.listen(3000)



