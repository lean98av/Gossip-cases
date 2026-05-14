import { Model, Optional } from 'sequelize';
import Category from './category';
export interface ProductAttributes {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
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
    image?: string;
    categoryId: number;
    showToClients: boolean;
    outStock: boolean;
}
export declare class Product extends Model<ProductAttributes> {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
    categoryId: number;
    showToClients: boolean;
    outStock: boolean;
    createdAt: Date;
    updatedAt: Date;
    get category(): Category | null;
    set category(value: Category | null);
}
export default Product;
//# sourceMappingURL=product.d.ts.map