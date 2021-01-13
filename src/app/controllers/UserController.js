import User from "../models/User";
import * as Yup from "yup";

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ["id", "name", "email", "status", "is_admin"],
    });
    // console.log(req.userId);
    return res.json(user);
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "status", "is_admin"],
    });
    return res.json(user);
  }

  async create(req, res) {
    const schema = Yup.object()
      .shape({
        name: Yup.string().required().max(70),
        email: Yup.string().email().required().max(120),
        password: Yup.string().required().min(6),
      })
      .noUnknown(); // Garante apenas esses campos, caso passe mais são desconsiderados

    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(409).json({ error: "Usuário já cadastrado" });
      }

      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const { id, name, email, status, is_admin } = await User.create(
        validFields
      );

      return res.json({ id, name, email, status, is_admin });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const schema = Yup.object()
      .shape({
        name: Yup.string().max(70),
        password: Yup.string().min(6),
      })
      .unknown();

    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        res.status(400).json({
          error: "Usuário não encontrado",
        });
      }
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const { name } = await user.update(validFields);

      return res.json({ name });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new UserController();
