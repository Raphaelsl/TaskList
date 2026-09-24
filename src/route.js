import { Router } from "express";

import authMiddleware from "./app/middlewares/auth.js";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import TaskController from "./app/controllers/TaskController.js";
import TagController from "./app/controllers/TagController.js";


const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);



routes.use(authMiddleware);
routes.put("/users", UserController.update);


routes.post("/tasks", TaskController.store);
routes.get("/tasks", TaskController.index);
routes.put("/tasks/:id", TaskController.update);
routes.delete("/tasks/:id", TaskController.delete);

routes.post("/tags", TagController.store);
routes.get("/tags", TagController.index);
routes.put("/tags/:id", TagController.update);
routes.delete("/tags/:id", TagController.delete);

export default routes;