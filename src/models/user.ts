import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

export interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttrs extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  email: string;
  passwordHash: string;
  isAdmin: boolean;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public isAdmin!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        fields: ['email'],
      },
    ],
  }
);

export default User;
