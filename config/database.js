const Sequelize = require('sequelize');

const conn = new Sequelize('test2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port : 3306
});

(async () => {
    try {
        await conn.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
})()

module.exports = conn;