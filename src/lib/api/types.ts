export type ValidationError = {
    field?: string;
    messageKey?: string;
};

export type ErrorResponse = {
    code: string;
    messageKey: string;
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