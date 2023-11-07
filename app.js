const express = require("express");
const app = express();
const path = require("path");

const userRoutes = require("./routes/imsRoutes");

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", userRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
