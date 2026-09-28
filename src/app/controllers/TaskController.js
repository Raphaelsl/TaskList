import Task from "../models/Task";
import Tag from "../models/Tag";
import AIServices from "../services/AIServices";
import * as Yup from "yup";


class TaskController {

    async index(req, res) {
        const tasks = await Task.findAll({
            where: { user_id: req.userId, check: false },
            attributes: ['id', 'task', 'check', 'due_date', 'tag_id'],
            include: [
                {
                    model: Tag,
                    as: 'tag',
                    attributes: ['id', 'name', 'color'],
                }
            ]
        });
        return res.json(tasks);
    }
    async update(req, res) {
        const { id } = req.params;

        const taskItem = await Task.findByPk(id);
        if (!taskItem) {
            return res.status(404).json({ error: "Task not found" });
        }
        if (taskItem.user_id !== req.userId) {
            return res.status(401).json({ error: "You don't have permission to update this task" });
        }

        const { task, check, due_date, tag_id } = req.body;

        await taskItem.update({ task, check, due_date, tag_id });
        return res.json(taskItem);

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
            due_date: Yup.date(),
            tag_id: Yup.number()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        const { task, due_date, tag_id } = req.body;


        const tasks = await Task.create({
            user_id: req.userId,
            task,
            due_date,
            tag_id
        });


        return res.json(tasks);

    }


    async storeAI(req, res) {

        const schema = Yup.object().shape({
            prompt: Yup.string().required()

        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        let aiData;
        try {
            aiData = await AIServices.parseTaskPrompt(req.body.prompt);
        } catch (error) {
            console.error("ERRO DO GEMINI:", error);
            return res.status(500).json({
                error: "Failed to process task",
                details: error.message
            });
        }


        const { task, due_date, tag_name } = aiData;
        console.log("DADOS RETORNADOS PELA IA:", aiData);
        let tagId = null;
        try {
            if (aiData.tag_name) {
                let tag = await Tag.findOne({
                    where: {
                        user_id: req.userId,
                        name: aiData.tag_name,
                    }
                });
                if (!tag) {
                    tag = await Tag.create({
                        name: aiData.tag_name,
                        color: aiData.tag_color || '#7159c1',
                        user_id: req.userId,
                    });
                }
                tagId = tag.id;
            }
            const newTask = await Task.create({
                user_id: req.userId,
                task: aiData.task,
                due_date: aiData.due_date,
                tag_id: tagId,
            });
            return res.json(newTask);
        } catch (dbError) {
            console.error("ERRO DO BANCO:", dbError.parent || dbError);
            return res.status(500).json({
                error: "Database error",
                details: dbError.message
            });
        }
    }
}
export default new TaskController();