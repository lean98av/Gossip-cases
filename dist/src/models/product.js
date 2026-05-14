"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const category_1 = __importDefault(require("./category"));
class Product extends sequelize_1.Model {
    get category() {
        const val = this.getDataValue('categoryId');
        return val ? category_1.default.findByPk(val, { raw: true }) : null;
    }
    set category(value) {
        this.setDataValue('categoryId', value?.id || 0);
    }
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [0, 2097152], // Base64 string max length for 2MB
        },
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: category_1.default,
            key: 'id',
        },
    },
    showToClients: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    outStock: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.default,
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
});
Product.belongsTo(category_1.default, {
    foreignKey: 'categoryId',
    as: 'category',
});
category_1.default.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products',
});
exports.default = Product;
//# sourceMappingURL=product.js.map