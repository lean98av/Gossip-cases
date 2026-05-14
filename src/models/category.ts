import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export interface CategoryAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreationAttrs extends Omit<CategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: 'categories',
    timestamps: true,
  }
);

export default Category;
