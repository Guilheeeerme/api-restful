"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          description: "Culinária Brasileira",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Culinária Japonesa",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Culinária Italiana",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
