import Recipe from "../models/Recipe";
import RecipeItem from "../models/RecipeItem";
import * as Yup from "yup";

class RecipeController {
  async index(req, res) {
    const { page = 1 } = req.query; // Por default 1, caso não exista
    const recipes = await Recipe.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          association: "user",
          attributes: ["id", "name"],
        },
        {
          association: "category",
          attributes: ["id", "description"],
        },
        {
          association: "attachment",
          attributes: ["id", "url", "file"],
        },
        {
          association: "items",
          attributes: ["id", "name", "quantity"],
        },
      ],
    });
    return res.json(recipes);
  }
  async show(req, res) {
    const recipe = await Recipe.findByPk(req.params.id, {
      attributes: [
        "id",
        "name",
        "preparation_instructions",
        "preparation_time",
        "portions",
      ],
      include: [
        {
          association: "user",
          attributes: ["id", "name"],
        },
        {
          association: "category",
          attributes: ["id", "description"],
        },
        {
          association: "attachment",
          attributes: ["id", "url", "file"],
        },
        {
          association: "items",
          attributes: ["id", "name", "quantity"],
        },
      ],
    });

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
        items: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required().max(60),
              quantity: Yup.string().max(100),
            })
          )
          .required()
          .min(1, "A receita precisa ter ao menos um ingrediente"),
      })
      .noUnknown();

    try {
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const recipe = await Recipe.create(
        {
          ...validFields,
          user_id: req.userId, // Criada no auth middleware
        },
        {
          include: [{ association: "items" }],
        }
      );

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
        items: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required().max(60),
              quantity: Yup.string().max(100),
            })
          )
          .required()
          .min(1, "A receita precisa ter ao menos um ingrediente"),
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

      const { items, ...recipeFields } = validFields;

      await recipe.update(recipeFields);

      const recipeItems = await recipe.getItems();

      await Promise.all(recipeItems.map((item) => item.destroy()));

      const newItems = await RecipeItem.bulkCreate(
        items.map((item) => ({
          ...item,
          recipe_id: req.params.id,
        }))
      );
      return res.json({ ...recipe.dataValues, items: newItems });
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
