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

}
export default new TagController();