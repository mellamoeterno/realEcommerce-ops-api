import { Severity, StockIssueType, Product  }from '../types';

export type RuleResult = {
    severity: Severity;
    message: string;
    details: Record<string, unknown>;
} | null;

export interface StockRule {
    type: StockIssueType;
    evaluate(product: Product, now: Date): RuleResult;
}

const DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds - 86400000 miliseconds

export const rules: StockRule[] = [
    {
        type: 'NEGATIVE_STOCK',
        evaluate: (p) => {
            p.quantityLimit < 0
                ? {
                      severity: 'critical',
                      message: `Product stock is negative ${p.name} possibly oversell or 
                      sync bug.`,
                      details: { quantityLimit: p.quantityLimit },
                  }
                : null;
        }
    },
    {
        type: 'RESERVED_EXCEEDS_AVAILABLE',
        evaluate: (p) => 
            p.quantityReserved > p.quantityLimit
        ? {
            severity: 'critical',
            message: `Reserved (${p.quantityReserved}) stock is greater than available stock (${p.quantityLimit}) for product ${p.name}.`,
            details: {
                quantityLimit: p.quantityLimit,
                 quantityReserved: p.quantityReserved,
                },
        }
        : null,
    },
    {
        type: 'OUT_OF_STOCK_ACTIVE',
        evaluate: (p) =>
            p.isActive && p.quantityLimit === 0
        ? {
            severity: 'high',
            message: `Active product ${p.name} is out of stock.`,
            details: {},
        }
        : null,
    },
    {
        type: 'BELOW_REORDER_POINT',
        evaluate: (p) =>
            p.isActive && p.quantityLimit > 0 && p.quantityLimit <= p.reorderPoint
        ? {
            severity: 'medium',
            message: `Stock ${p.name} is at or below its reorder point (${p.reorderPoint}).`,
            details: {
                quantityLimit: p.quantityLimit,
                reorderPoint: p.reorderPoint,
            },
        }
        : null,
        },
        {
            type: 'STALE_STOCK_DATA',
            evaluate: (p, now) => {
                if (!p.lastRestockedAt) return null;
                const days = Math.floor((
                    now.getTime() - new Date(p.lastRestockedAt).getTime()) / DAY_MS
                );
                return days > 30
                ? {
                    severity: 'low',
                    message: `No stock recorded in ${days} days - stock count may be stable`,
                    details: { daysSinceRestock: days},
                } : null;
                
                
                
        },
    },
];//fix errors later