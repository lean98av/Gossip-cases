export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export declare const errorHandler: (err: any, req: any, res: any, next: any) => void;
//# sourceMappingURL=error.d.ts.map