import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('uty', 'root', 'Ingai4ch', {
	host: '127.0.0.1',
	dialect: 'mysql',
	logging: false, // set true to see SQL logs
});

export default sequelize;
