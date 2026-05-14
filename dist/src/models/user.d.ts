import { Model, Optional } from 'sequelize';
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
export declare class User extends Model<UserAttributes> implements UserAttributes {
    id: number;
    email: string;
    passwordHash: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export default User;
//# sourceMappingURL=user.d.ts.map