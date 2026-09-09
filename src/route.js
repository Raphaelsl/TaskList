import {Router} from "express";

import authMiddleware from "./app/middlewares/auth.js";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";


const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);



routes.use(authMiddleware);
routes.put("/users", UserController.update);

export default routes;