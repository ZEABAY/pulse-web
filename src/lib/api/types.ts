export type ValidationError = {
    field?: string;
    message?: string;
};

export type ErrorResponse = {
    code: string;
    message: string;
    path?: string;
    timestamp?: string;
    validationErrors?: ValidationError[] | null;
};

export type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    error: ErrorResponse | null;
    traceId: string;
    timestamp: string;
};