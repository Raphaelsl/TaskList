import * as Yup from 'yup';
import Tag from "../models/Tag";

class TagController {

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            color: Yup.string().required(),
        })
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }
        const { name, color } = req.body;


        //verifc tag existe
        const tagExists = await Tag.findOne({
            where: {
                user_id: req.userId,
                name,
            }
        });
        if (tagExists) {
            return res.status(400).json({ error: "Tag already exists" });
        }


        const tag = await Tag.create({
            name,
            color,
            user_id: req.userId,
        })
        return res.json(tag);

    }
    async index(req, res) {
        const tags = await Tag.findAll({
            where: {
                user_id: req.userId,
            },
            attributes: ['id', 'name', 'color'],
        });
        return res.json(tags);
    }
    async update(req, res) {
        const { id } = req.params;
        const { name, color } = req.body;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: "tag not found" });
        }
        if (tag.user_id !== req.userId) {
            return res.status(401).json({ error: "you dont have permission" });
        }
        if (name && name !== tag.name) {
            const tagExists = await Tag.findOne({
                where: {
                    user_id: req.userId,
                    name,
                }
            });
            if (tagExists) {
                return res.status(400).json({ error: "Tag already exists" });
            }
        }
        await tag.update({ name, color });
        return res.json(tag);
    }
    async delete(req, res) {
        const { id } = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: "tag not found" });
        }
        if (tag.user_id !== req.userId) {
            return res.status(401).json({ error: "you dont have permission" });
        }
        await tag.destroy();
        return res.send();
    }

}
export default new TagController();