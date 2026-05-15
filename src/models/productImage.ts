import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './product';

export interface ProductImageAttributes {
  id: number;
  productId?: number;
  name: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImageCreationAttrs {
  id?: number | undefined;
  productId?: number | undefined;
  name: string;
  file: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductImage extends Model<ProductImageAttributes> {
  public id!: number;
  public productId!: number;
  public name!: string;
  public file!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public get product(): Product | null {
    const val = this.getDataValue('productId');
    return val ? (Product as any).findByPk(val, { raw: true }) : null;
  }

  public set product(value: Product | null) {
    this.setDataValue('productId', value?.id ?? undefined);
  }
}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING(2097152),
      allowNull: false,
      validate: {
        len: [0, 2097152], // Base64 string max length for 2MB
      },
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
    tableName: 'product_images',
    timestamps: true,
    indexes: [
      {
        fields: ['productId'],
      },
    ],
  }
);

Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  as: 'images',
});

ProductImage.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

Product.hasMany(Product, {
  foreignKey: 'imageId',
  as: 'productReferences',
});

export default ProductImage;
