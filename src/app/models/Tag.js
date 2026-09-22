import Sequelize,{Model} from 'sequelize';

class Tag extends Model{
    static init(sequelize){
        super.init({   
            name : Sequelize.STRING,
            color : Sequelize.STRING,
        },{
           sequelize, 
        });
        return this;

    }
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as : 'user'});
    }
}
export default Tag;