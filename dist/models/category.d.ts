import { Model } from 'sequelize';
export interface CategoryAttributes {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CategoryCreationAttrs extends Omit<CategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
export declare class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export default Category;
//# sourceMappingURL=category.d.ts.map