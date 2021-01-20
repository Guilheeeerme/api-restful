import * as Yup from "yup";
import Recipe from "../models/Recipe";

class RatingController {
  async create(req, res) {
    const schema = Yup.object()
      .shape({
        rating: Yup.number().min(1).max(5).required(),
      })
      .noUnknown();

    try {
      const validFields = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      const { recipe_id } = req.params;

      const recipe = await Recipe.findByPk(recipe_id);

      if (!recipe) {
        return res.status(400).json({ error: "Receita não encontrada" });
      }

      await recipe.addRating(req.userId, {
        through: { rating: validFields.rating },
      });

      return res.json(recipe);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new RatingController();
