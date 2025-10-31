module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: true },
    address: { type: DataTypes.STRING(400), allowNull: true },
    owner_id: { type: DataTypes.INTEGER, allowNull: false },
    average_rating: { type: DataTypes.DECIMAL(3,2), defaultValue: 0.00 },
    total_ratings: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'stores',
    timestamps: false
  });

  return Store;
};
