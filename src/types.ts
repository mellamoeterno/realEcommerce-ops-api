export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type StockIssueType =
    | 'NEGATIVE_STOCK'
    | 'RESERVED_EXCEEDS_AVAILABLE'
    | 'OUT_OF_STOCK_ACTIVE'
    | 'BELOW_REORDER_POINT'
    | 'STALE_STOCK_DATA';

export interface Product {
    id: string;
    sku:string;
    name: string;
    quantityLimit: number;
    quantityReserved: number;
    reorderPoint: number;
    isActive: boolean;
    lastRestockedAt: string | null;
}

export interface StockIssue {
    id: string;
    productId: string;
    sku:string;
    productName: string;
    type: StockIssueType;
    severity: Severity;
    message: string;
    details: Record<string, unknown>;
    detectedAt: string;
}

export const SEVERITY_RANK: Record<Severity, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
};

