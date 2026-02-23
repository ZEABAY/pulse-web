export type PageRequest = {
    page: number;
    size: number;
    sort?: string[];
};

export type PageResponse<T> = {
    items: T[];
    page: number;
    size: number;
    totalElements?: number;
    totalPages?: number;
    hasNext?: boolean;
};

export function toPageQuery(req: PageRequest): string {
    const p = new URLSearchParams();
    p.set("page", String(req.page));
    p.set("size", String(req.size));
    req.sort?.forEach((s) => p.append("sort", s));
    return p.toString();
}
