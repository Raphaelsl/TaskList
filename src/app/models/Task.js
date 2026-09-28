import Sequelize, { Model } from 'sequelize';

class Task extends Model {
    static init(sequelize) {
        super.init({
            task: Sequelize.STRING,
            check: Sequelize.BOOLEAN,
            due_date: Sequelize.DATE,
            tag_id: Sequelize.INTEGER,

        },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Tag, { foreignKey: 'tag_id', as: 'tag' });

    }
}
export default Task;