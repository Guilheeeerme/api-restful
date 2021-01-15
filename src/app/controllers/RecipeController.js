import Recipe from "../models/Recipe";
import * as Yup from "yup";

class RecipeController {
  async index(req, res) {
    const { page = 1 } = req.query; // Por default 1, caso não exista
    const recipes = await Recipe.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(recipes);
  }
  async show(req, res) {
    const recipe = await Recipe.findByPk(req.params.id);
    return res.json(recipe);
  }
  async create(req, res) {
    const schema = Yup.object()
      .shape({
        name: Yup.string().max(100).required(),
        preparation_instructions: Yup.string().required(),
        preparation_time: Yup.number().required(),
        portions: Yup.number().required(),
        category_id: Yup.number().required(),
        attachment_id: Yup.number(),
      })
      .noUnknown();

    try {
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const recipe = await Recipe.create({
        ...validFields,
        user_id: req.userId, // Criada no auth middleware
      });

      return res.json(recipe);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  async update(req, res) {
    const schema = Yup.object()
      .shape({
        name: Yup.string().max(100).required(),
        preparation_instructions: Yup.string().required(),
        preparation_time: Yup.number().required(),
        portions: Yup.number().required(),
        category_id: Yup.number().required(),
        attachment_id: Yup.number(),
      })
      .noUnknown();

    try {
      const recipe = await Recipe.findByPk(req.params.id);

      if (!recipe) {
        return res.status(400).json({ error: "Receita não encontrada" });
      }

      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      await recipe.update(validFields);

      return res.json(recipe);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async delete(req, res) {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(400).json({ error: "Receita não encontrada" });
    }

    await recipe.destroy();

    return res.json({ message: "Receita removida com sucesso" });
  }
}

export default new RecipeController();
