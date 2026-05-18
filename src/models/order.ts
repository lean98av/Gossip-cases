import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './product';
import OrderProduct from './orderProduct';

export interface OrderAttributes {
  id: number;
  total: number;
  products: string;
  address: string;
  clientName: string;
  clientNotes: string;
  status: 'pending' | 'inProgress'| 'payed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCreationAttrs extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  total: number;
  products: string;
  status: 'pending' | 'inProgress'| 'payed' | 'cancelled';
}

export class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public total!: number;
  public products!: string;
  public address!: string;
  public clientName!: string;
  public clientNotes!: string;
  public status!: 'pending' | 'inProgress'| 'payed' | 'cancelled';
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
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    products: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'inProgress', 'payed', 'cancelled'),
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
