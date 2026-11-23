const path = require("path");
const express = require("express");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", registrationRoutes);

// 404 handler (invalid URLs)
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong on the server.");
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`CampusConnect running on http://localhost:${PORT}`));
}

module.exports = app; // needed for Vercel deployment
