const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
require("dotenv").config();

const app = express();
const port = 3001;


// app.use(credentials);
// app.use(cors(corsOptions));

// app.use(credentials);
app.use(cors({origin:["http:/localhost:5173"], methods:["GET", "POST", "OPTIONS"]}));

app.use(express.json());
app.use(cookieParser());


app.use("/user", require("./routes/employeeroutes"));
app.use("/provider", require("./routes/providerroutes"));
app.use("/auth", require("./routes/authroutes"));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});