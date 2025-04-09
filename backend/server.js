const express = require("express");
const dotenv = require("dotenv");
const { app, server } = require("./socket/socket.js");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/auth.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const userRoutes = require("./routes/user.routes.js");

const connectToDb = require("./db/connectToMongoDB.js");

dotenv.config();

const __dirName = path.resolve();

const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json()); // For parsing application/json

app.use("/api/auth", authRoutes); // middleware
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirName, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirName, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  connectToDb();
  console.log(`Server listening on port ${port}`);
});
