import { DataTypes } from "sequelize"
import sequelize from "../services/db.service.js";

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	uuid: {
		type: DataTypes.UUID,
		allowNull: true,
	},
	platform: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	}
}, {
	tableName: 'users',
	timestamps: false,
});

export default User;
