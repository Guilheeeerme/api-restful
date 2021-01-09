import { Router } from "express";

const routes = Router();

import UserController from "../app/controllers/UserController";

routes.get("/users", UserController.index);

export default routes;
