import sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
    constructor() { 
        this.init();
}
    init() {
        this.connection = new sequelize(databaseConfig);
        models.map((model) => model.init(this.connection));
    }

}
module.exports = new Database();