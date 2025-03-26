const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const userRoutes = require("./routes/user.routes.js");

const connectToDb = require("./db/connectToMongoDB.js");

dotenv.config();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json()); // For parsing application/json

app.use("/api/auth", authRoutes); // middleware
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  connectToDb();
  console.log(`Server listening on port ${port}`);
});
