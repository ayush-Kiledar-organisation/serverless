const { Sequelize } = require("sequelize");

const Verify = {

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
       
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      send_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      }

}

module.exports = Verify;