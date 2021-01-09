import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(70),
        email: Sequelize.STRING(120),
        password_hash: Sequelize.VIRTUAL,
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
}

export default User;
