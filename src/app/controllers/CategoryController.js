import Category from "../models/Category";

class CategoryController {
  async index(req, res) {
    const { page = 1 } = req.query; // default 1 caso não venha nada
    const filter = {
      offset: (page - 1) * 20,
      limit: 20,
    };
    const categories = await Category.findAll({
      ...filter,
      order: ["description"],
    });

    return res.json(categories);
  }
}

export default new CategoryController();
