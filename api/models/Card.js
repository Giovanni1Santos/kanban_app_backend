import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Card = sequelize.define('Card', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.ENUM('todo', 'doing', 'done'),
    defaultValue: 'todo',
    validate: {
      isIn: [['todo', 'doing', 'done']]
    }
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Card.belongsTo(User);

export default Card;