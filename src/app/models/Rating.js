import Sequelize, { Model } from "sequelize";

class Rating extends Model {
  static init(sequelize) {
    super.init(
      {
        rating: Sequelize.DECIMAL(5, 2),
      },
      {
        sequelize,
        tableName: "recipe_rating",
      }
    );
    return this;
  }
}

export default Rating;
