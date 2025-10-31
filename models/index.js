const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, DataTypes);
db.Store = require("./Store")(sequelize, DataTypes);
db.Rating = require("./Rating")(sequelize, DataTypes);

db.User.hasMany(db.Rating, { foreignKey: "user_id" });
db.Store.hasMany(db.Rating, { foreignKey: "store_id" });
db.Rating.belongsTo(db.User, { foreignKey: "user_id" });
db.Rating.belongsTo(db.Store, { foreignKey: "store_id" });

module.exports = db;
