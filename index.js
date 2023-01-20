//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLayouts=require("express-ejs-layouts");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const csvRoute = require("./routes/csvRoute");
const pdfRoute = require("./routes/pdfRoute");
const path=require("path");
mongoose.set("strictQuery", true);
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(expressLayouts)
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
const port = 3000 || process.env.PORT;
mongoose
  .connect(process.env.DATABASE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/recruiters", csvRoute);
app.use("/api/export", pdfRoute);
app.listen(port, () => {
  console.log(`Sever running at ${port}`);
});
