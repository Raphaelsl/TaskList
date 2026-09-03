import {Router} from "express";
import User from './app/models/User.js';

const routes = new Router();

routes.get('/teste', async (req, res) => {
    const user = await User.create({
        name: "Raphael",
        email: "raphael@example.com",
        password_hash: "123",

    });
        
    return res.json(user);
});

export default routes;