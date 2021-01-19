import Recipe from "../models/Recipe";

class FavoriteController {
  async create(req, res) {
    const { recipe_id } = req.params;

    const recipe = await Recipe.findByPk(recipe_id);

    if (!recipe) {
      return res.status(400).json({ error: "Receita não encontrada " });
    }

    await recipe.addUser(req.userId);

    return res.json({ message: "Receita favoritada com sucesso" });
  }

  async index(req, res) {
    const favoritesRecipes = await Recipe.findAll({
      include: [
        {
          attributes: [],
          association: "users",
          where: {
            id: req.userId,
          },
        },
      ],
    });

    return res.json(favoritesRecipes);
  }

  async delete(req, res) {
    const { recipe_id } = req.params;

    const recipe = await Recipe.findByPk(recipe_id);

    if (!recipe) return res.status(400).json({ error: "Receita não entrada" });

    await recipe.removeUser(req.userId);

    return res.json({ message: "Receita removida dos favoritos" });
  }
}

export default new FavoriteController();
