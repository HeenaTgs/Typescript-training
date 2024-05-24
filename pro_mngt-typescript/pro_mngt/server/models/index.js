const Sequelize = require("sequelize");

const sequelize = new Sequelize('pro_mgnt', 'root', '', {
    host: 'localhost',
    dialect:"mysql"
  });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);

db.user.hasOne(db.product, { foreignKey: 'created_by'});
db.product.belongsTo(db.user,{ foreignKey: 'created_by', as: 'UserDetails'});

db.user.hasMany(db.product, { foreignKey: 'created_by' });
db.product.belongsTo(db.user,{ foreignKey: 'created_by' });

module.exports = db;