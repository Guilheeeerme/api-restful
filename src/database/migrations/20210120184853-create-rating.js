"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("recipe_rating", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      user_id: {
        // Referencia à user
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE", // Atualizando/Deletando lá, reflete aqui
        onDelete: "CASCADE",
      },
      recipe_id: {
        // Referencia à receita
        type: Sequelize.INTEGER,
        references: {
          model: "recipes",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    queryInterface.dropTable("recipe_rating");
  },
};
