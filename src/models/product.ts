import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Category from './category';
import ProductImage from './productImage';

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageId?: number;
  categoryId: number;
  showToClients: boolean;
  outStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreationAttrs extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  name: string;
  price: number;
  description?: string;
  imageId?: number;
  categoryId: number;
  showToClients: boolean;
  outStock: boolean;
  id?: undefined;
  createdAt?: undefined;
  updatedAt?: undefined;
}

export class Product extends Model<ProductAttributes> {
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string;
  public categoryId!: number;
  public showToClients!: boolean;
  public outStock!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  public get category(): Category | null {
    const val = this.getDataValue('categoryId') as number;
    return val ? (Category as any).findByPk(val, { raw: true }) : null;
  }

  public set category(value: Category | null) {
    this.setDataValue('categoryId', value?.id || 0);
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_images',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
    },
    showToClients: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    outStock: {
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
    tableName: 'products',
    timestamps: true,
    indexes: [
      {
        fields: ['showToClients'],
      },
      {
        fields: ['categoryId'],
      },
    ],
  }
);

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  as: 'images',
});

ProductImage.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
});

export default Product;
