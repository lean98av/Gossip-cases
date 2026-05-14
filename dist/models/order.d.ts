import { Model, Optional } from 'sequelize';
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
export declare class Order extends Model<OrderAttributes> implements OrderAttributes {
    id: number;
    products: number[];
    total: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}
export default Order;
//# sourceMappingURL=order.d.ts.map