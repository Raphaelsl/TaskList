import Task from "../models/Task";
import * as Yup from "yup";


class TaskController {

    async index(req, res) {
        const tasks = await Task.findAll({
            where: { user_id: req.userId, check: false },
            attributes: ['id', 'task', 'check'],
        });
        return res.json(tasks);
    }
    async update(req, res) {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        if (task.user_id !== req.userId) {
            return res.status(401).json({ error: "You don't have permission to update this task" });
        }
        await task.update(req.body);
        return res.json(task);

    }
    async delete(req, res) {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        if (task.user_id !== req.userId) {
            return res.status(401).json({ error: "You don't have permission to delete this task" });
        }
        await task.destroy();
        return res.send();
    }



    async store(req, res) {

        const schema = Yup.object().shape({
            task: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        const { task } = req.body;


        const tasks = await Task.create({
            user_id: req.userId,
            task,
        });


        return res.json(tasks);

    }
}
export default new TaskController();