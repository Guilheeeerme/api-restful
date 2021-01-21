"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("users", "avatar_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "attachments",
        key: "id",
      },
      onUpdated: "SET NULL",
      onUDeleted: "SET NULL", // Caso delete, o campo aqui fica null
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn("users", "avatar_id");
  },
};
