import { Router } from "express";

const routes = Router();

import UserController from "../app/controllers/UserController";
import AuthController from "../app/controllers/AuthController";
import CategoryController from "../app/controllers/CategoryController";

import authMiddleware from "../app/middlewares/authMiddleware";

routes.post("/users", UserController.create);
routes.post("/auth", AuthController.create);

routes.use(authMiddleware); // global, a partir daqui

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users/", UserController.update); // Sem necessidade do parametro, pois o usuario esta logado

routes.get("/categories", CategoryController.index);

export default routes;
