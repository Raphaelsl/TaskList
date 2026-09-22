import sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Task from '../app/models/Task';
import Tag from '../app/models/Tag';

const models = [User, Task, Tag];

class Database {
    constructor() { 
        this.init();
}
    init() {
        this.connection = new sequelize(databaseConfig);
        models
        .map((model) => model.init(this.connection))
        .map((model) => model.associate && model.associate(this.connection.models));

    }

}
module.exports = new Database();