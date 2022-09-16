import { Sequelize } from  "sequelize";

const db = new Sequelize('second_app','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;