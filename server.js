require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoute = require("./routes/userRoute");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require('./routes/ratingRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoute);
app.use("/api/stores", storeRoutes);
app.use('/api/rating', ratingRoutes);

app.get('/', (req, res) => {
  res.send('Store Rating System Backend is running...');
});
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully');
    await sequelize.sync(); // creates tables if not exist
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
