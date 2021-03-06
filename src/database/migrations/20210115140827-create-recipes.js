"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("recipes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      preparation_instructions: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      preparation_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      portions: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        // Relacionamento está definido no model
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      category_id: {
        // Relacionamento está definido no model
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      attachment_id: {
        // Relacionamento está definido no model
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "attachments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    queryInterface.dropTable("recipes");
  },
};
