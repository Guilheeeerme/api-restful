import Sequelize, { Model } from "sequelize";

class Attachment extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        file: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          // retorno customizado
          get() {
            return `http://localhost:3001/attachments/${this.file}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Attachment;
