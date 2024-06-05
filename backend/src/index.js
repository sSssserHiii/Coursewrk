const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
require("dotenv").config();

const app = express();
const port = 3001;


app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


app.use("/user", require("./routes/employeeroutes"));
app.use("/provider", require("./routes/providerroutes"));
app.use("/auth", require("./routes/authroutes"));
app.use('/category', require("./routes/category-routes"));
app.use('/product', require("./routes/providerroutes"));
app.use('/store', require("./routes/storeroutes"));
app.use('/invoicedeliverly', require("./routes/invoice-deliverly-routes"));
app.use('/changingmiddlekeykeeper', require("./routes/changing-middle-key-keeper-routes"));
app.use('/invoice', require("./routes/invoice-routes"));
app.use('/reporttosendinthestore', require("./routes/report-to-send-in-the-store-routes"));
app.use('/requestforchanginggoods', require("./routes/request-for-changing-goods-routes"));
app.use('/requestforgoodsmiddlekeykeeper', require("./routes/request-for-goods-middle-key-keeper-routes"));
app.use('/requestforgoods', require("./routes/request-for-goods-routes"));
app.use('/requestforretunmiddlekeykeeper', require("./routes/request-for-return-middle-key-keeper-routes"));
app.use('/sharingreportmiddlekeykeeper', require("./routes/sharing-report-middle-key-keeper-routes"));
app.use('/store', require("./routes/storeroutes"));
app.use('/writeoffgoods', require("./routes/write-off-goods-routes"));
app.use('/writeoffmiddlevalue', require("./routes/write-off-middle-value-routes"));


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});