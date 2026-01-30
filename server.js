require("module-alias/register");
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("@/routes");

const app = express();
const PORT = 3000;

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://manththang203.github.io"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Mount routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
