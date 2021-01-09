import User from "../models/User";

class UserController {
  async index(req, res) {
    const user = await User.findAll();
    return res.json(user);
  }
}

export default new UserController();
