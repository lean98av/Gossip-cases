import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './product';

export interface OrderAttributes {
  id: number;
  products: number[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCreationAttrs extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  products: number[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public products!: number[];
  public total!: number;
  public status!: 'pending' | 'confirmed' | 'cancelled';
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
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
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        fields: ['status'],
      },
      {
        fields: ['createdAt'],
      },
    ],
  }
);

export default Order;
