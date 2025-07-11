import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Card = sequelize.define('Card', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, defaultValue: '' },
  status: { type: DataTypes.ENUM('todo', 'doing', 'done'), defaultValue: 'todo' },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Card.belongsTo(User, { foreignKey: 'userId' });

export default Card;
