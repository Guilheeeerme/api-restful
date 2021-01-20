import { Router } from "express";
import multer from "multer";

import multerConfig from "../config/multer";

const routes = Router();

const upload = multer(multerConfig);

import UserController from "../app/controllers/UserController";
import AuthController from "../app/controllers/AuthController";
import CategoryController from "../app/controllers/CategoryController";
import AttachmentController from "../app/controllers/AttachmentController";
import RecipeController from "../app/controllers/RecipeController";
import FavoriteController from "../app/controllers/FavoriteController";
import RatingController from "../app/controllers/RatingController";

import authMiddleware from "../app/middlewares/authMiddleware";

routes.post("/users", UserController.create);
routes.post("/auth", AuthController.create);

routes.use(authMiddleware); // global, a partir daqui

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users", UserController.update); // Sem necessidade do parametro, pois o usuario esta logado

routes.get("/categories", CategoryController.index);

routes.post("/attachments", upload.single("file"), AttachmentController.create);

routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.show);
routes.post("/recipes", RecipeController.create);
routes.put("/recipes/:id", RecipeController.update);
routes.delete("/recipes/:id", RecipeController.delete);

routes.post("/favorites/:recipe_id", FavoriteController.create);
routes.get("/favorites", FavoriteController.index);
routes.delete("/favorites/:recipe_id", FavoriteController.delete);

routes.post("/ratings/:recipe_id", RatingController.create);

export default routes;
