import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(70),
        email: Sequelize.STRING(120),
        password: Sequelize.VIRTUAL, // Não salva no db
        password_hash: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        is_admin: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsToMany(models.Recipe, {
      as: "favorites",
      through: "user_favorites",
      foreignKey: "user_id",
    });
  }
}

export default User;
